"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "MenuItems",
      [
        {
          name: "Croissant",
          description: "Buttery flaky pastry",
          price: 25000,
          category: "Pastry",
          imageUrl: "/images/croissant.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Sourdough Bread",
          description: "Crusty artisan bread",
          price: 35000,
          category: "Bread",
          imageUrl: "/images/sourdough.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("MenuItems", null, {});
  },
};
