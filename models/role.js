// models/role.js
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
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

  Role.associate = function(models) {
    // Relación uno a muchos: Un Rol tiene muchos Usuarios
    Role.hasMany(models.User, {
      foreignKey: 'roleId',  // clave foránea en la tabla Users
      as: 'User'
    });
  };

  return Role;
};
