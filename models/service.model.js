
module.exports = (sequelize, DataTypes) => {
  const Service = sequelize.define('Service', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nameService: {
      type: DataTypes.STRING,
      allowNull: false
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Category',
        key: 'id'
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    organizer: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    startSchedule: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endSchedule: {
      type: DataTypes.DATE,
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    img: {
      type: DataTypes.STRING,
      allowNull: true
    },
    defaultDuration:{
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 60
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address2: {
      type: DataTypes.STRING,
      allowNull: true
    },
    zipcode: {
      type: DataTypes.STRING,
      allowNull: true
    },
    country:{
      type: DataTypes.STRING,
      allowNull: true
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lat:{
      type: DataTypes.STRING,
      allowNull: true
    },
    lng:{
      type: DataTypes.STRING,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    freezeTableName: true,
  });

  Service.associate = function(models) {
    // Relación muchos a uno: Un Service pertenece a una Category
    Service.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      as: 'Category'
    });

    // Relación muchos a uno: Un Service pertenece a una User
    Service.belongsTo(models.User, {
      foreignKey: 'organizer',
      as: 'User'
    });
  };

  return Service;
};
