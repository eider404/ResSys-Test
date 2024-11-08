// models/user.js
module.exports = (sequelize, DataTypes) => {
  const MembershipHistory = sequelize.define('MembershipHistory', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    membershipId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Membership',
        key: 'id'
      }
    },
    price: {  
      type: DataTypes.INTEGER,
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

  MembershipHistory.associate = function(models) {
    MembershipHistory.belongsTo(models.Membership, {
      foreignKey: 'membershipId',
      as: 'Membership'
    });
  };

  return MembershipHistory;
};
