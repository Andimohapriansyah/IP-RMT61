"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    static associate(models) {
      OrderDetail.belongsTo(models.Order, { foreignKey: "orderId" });
      OrderDetail.belongsTo(models.MenuItem, { foreignKey: "menuItemId" });
    }
  }
  OrderDetail.init(
    {
      orderId: DataTypes.INTEGER,
      menuItemId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      subtotal: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: "OrderDetail",
    }
  );
  return OrderDetail;
};
