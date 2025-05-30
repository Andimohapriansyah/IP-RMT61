"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MenuItem extends Model {
    static associate(models) {
      MenuItem.hasMany(models.OrderDetail, { foreignKey: "menuItemId" });
    }
  }
  MenuItem.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      price: DataTypes.DECIMAL,
      category: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "MenuItem",
    }
  );
  return MenuItem;
};
