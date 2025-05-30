const express = require("express");
const router = express.Router();
const { MenuItem } = require("../models");
const { Op } = require("sequelize");
const geminiSearch = require("../services/gemini");

// Get all menu items
router.get("/", async (req, res) => {
  try {
    const menuItems = await MenuItem.findAll();
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific menu item
router.get("/:id", async (req, res) => {
  try {
    const menuItem = await MenuItem.findByPk(req.params.id);
    if (!menuItem)
      return res.status(404).json({ error: "Menu item not found" });
    res.json(menuItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search menu items with AI
router.post("/search", async (req, res) => {
  const { query } = req.body;
  try {
    const searchTerms = await geminiSearch(query);
    const menuItems = await MenuItem.findAll({
      where: {
        name: {
          [Op.iLike]: `%${searchTerms}%`,
        },
      },
    });
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
