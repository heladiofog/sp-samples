'use strict';
module.exports = (sequelize, DataTypes) => {
  var Category = sequelize.define('Category', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {});
  Category.associate = function(models) {
    // associations can be defined here
    Category.belongsToMany(models.Product, {
      through: 'ProductCategories'
    });
  };
  return Category;
};