require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { sequelize, Order } = require("./models");
const authRoutes = require("./routes/auth");
const menuRoutes = require("./routes/menu");
const orderRoutes = require("./routes/orders");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);

// Welcome route
app.get("/", (req, res) => {
  res.send("Welcome to the Bakery API!");
});

// Midtrans notification handler (if you use it)
app.post("/api/payment/notification", async (req, res) => {
  const notification = req.body;
  const orderId = notification.order_id;
  const status = notification.transaction_status;

  if (status === "settlement" || status === "capture") {
    await Order.update({ status: "paid" }, { where: { id: orderId } });
  } else if (status === "expire") {
    await Order.update({ status: "expired" }, { where: { id: orderId } });
  }
  res.status(200).end();
});

// Only start the server if this file is run directly
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app; // Export app for testing
