'use strict';
module.exports = (sequelize, DataTypes) => {
  var Cart = sequelize.define('Cart', {
    total: DataTypes.NUMERIC,
    status: DataTypes.BOOLEAN
  }, {});
  Cart.associate = function(models) {
    // associations can be defined here
    // Cart hasmany cartItems
    Cart.hasMany(models.CartItem);
    // Cart belongsTo a Customer
    Cart.belongsTo(models.Customer);
  };
  return Cart;
};