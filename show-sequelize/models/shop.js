'use strict';
module.exports = (sequelize, DataTypes) => {
  var Shop = sequelize.define('Shop', {
    name: {
      type: DataTypes.STRING,
      unique: true
    }
  }, {});
  Shop.associate = function(models) {
    // associations can be defined here
    // A shop hasMany Coffees
    Shop.hasMany(models.Coffee, {
      // foreignKey: 'shopId', sourceKey: 'id'
    });
  };
  return Shop;
};