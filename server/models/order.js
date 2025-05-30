"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User, { foreignKey: "userId" });
      Order.hasMany(models.OrderDetail, { foreignKey: "orderId" });
    }
  }
  Order.init(
    {
      userId: DataTypes.INTEGER,
      totalAmount: DataTypes.DECIMAL,
      status: {
        type: DataTypes.STRING,
        defaultValue: "pending",
      },
      orderDate: DataTypes.DATE,
      orderType: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
