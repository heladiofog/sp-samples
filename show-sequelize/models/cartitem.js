'use strict';
module.exports = (sequelize, DataTypes) => {
  var CartItem = sequelize.define('CartItem', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    price: DataTypes.NUMERIC
  }, {});
  CartItem.associate = function(models) {
    // associations can be defined here
    // Cart Item belongsTo a Cart
    CartItem.belongsTo(models.Cart);
    // Cart Item belongsTo a (father) Product
    CartItem.belongsTo(models.Product);
  };
  return CartItem;
};