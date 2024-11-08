
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    categoryName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    freezeTableName: true,
  });

  Category.associate = function(models) {
    
    Category.hasMany(models.Service, {
      foreignKey: 'categoryId',
      as: 'Service'
    });
  };

  return Category;
};
