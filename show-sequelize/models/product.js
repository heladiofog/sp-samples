'use strict';
module.exports = (sequelize, DataTypes) => {
  var Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.NUMERIC
  }, {});
  Product.associate = function(models) {
    // associations can be defined here
    // A Product hasMany CartItems
    // Product.hasMany(models.CartItems);
    Product.belongsToMany(models.Category, {
      through: 'ProductCategories'
    });
  };
  return Product;
};