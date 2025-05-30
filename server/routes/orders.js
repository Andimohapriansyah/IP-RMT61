const express = require("express");
const router = express.Router();
const { Order, OrderDetail, MenuItem } = require("../models");
const authenticateToken = require("../middleware/auth");
const midtransClient = require("midtrans-client");
const { Op } = require("sequelize");

const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

// Create order
router.post("/", authenticateToken, async (req, res) => {
  try {
    console.log("ORDER BODY:", req.body); // Debug log
    const { items, orderType } = req.body;
    // Defensive check for items array
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Items array is required" });
    }

    const totalAmount = items.reduce((sum, item) => sum + item.subtotal, 0);
    const order = await Order.create({
      userId: req.user.id,
      totalAmount,
      status: "pending",
      orderDate: new Date(),
      orderType,
    });

    const orderDetails = items.map((item) => ({
      orderId: order.id,
      menuItemId: item.menuItemId,
      quantity: item.quantity,
      subtotal: item.subtotal,
    }));
    await OrderDetail.bulkCreate(orderDetails);

    // Initiate Midtrans payment (mock if needed)
    const parameter = {
      transaction_details: {
        order_id: order.id.toString(),
        gross_amount: totalAmount,
      },
      customer_details: {
        email: req.user.email,
      },
    };

    let transaction;
    try {
      transaction = await snap.createTransaction(parameter);
    } catch (err) {
      // If Midtrans fails, still return order for dev/testing
      transaction = { token: "dummy-token" };
    }

    res.json({ token: transaction.token, orderId: order.id });
  } catch (error) {
    console.error("ORDER ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get user's orders (history)
router.get("/", authenticateToken, async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.user.id },
      include: [{ model: OrderDetail, include: [MenuItem] }],
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Cancel unpaid order
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const order = await Order.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id,
        status: { [Op.in]: ["pending", "unpaid"] },
      },
    });
    if (!order)
      return res
        .status(404)
        .json({ error: "Order not found or cannot be canceled" });

    // Delete order details first
    await OrderDetail.destroy({ where: { orderId: order.id } });

    // Then delete the order
    await order.destroy();
    res.json({ message: "Order canceled" });
  } catch (error) {
    console.error(error); // For debugging
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
