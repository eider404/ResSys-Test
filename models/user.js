// models/user.js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Role',
        key: 'id'
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
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

  User.associate = function(models) {
    // Relación muchos a uno: Un Usuario pertenece a un Rol
    User.belongsTo(models.Role, {
      foreignKey: 'roleId',
      as: 'Role'
    });

    // Relación uno a muchos: Un Usuario tiene muchas Reservaciones
    User.hasMany(models.Reservation, {
      foreignKey: 'userClient',
      as: 'Reservation'
    });

    //Relacion ano a uno: Un usuario tiene una Membership
    User.hasOne(models.Organizer, {
      foreignKey: 'usersId',
      as: 'Organizer'
    });

  };

  return User;
};
