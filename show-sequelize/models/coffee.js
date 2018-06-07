'use strict';
module.exports = (sequelize, DataTypes) => {
  var Coffee = sequelize.define('Coffee', {
    name: DataTypes.STRING,
    type: DataTypes.STRING
  }, {});
  Coffee.associate = function(models) {
    // associations can be defined here
    // Coffee belongsTo a Shop
    Coffee.belongsTo(models.Shop, {
      // foreignKey: 'shopId', sourceKey: 'id'
    });
  };
  return Coffee;
};