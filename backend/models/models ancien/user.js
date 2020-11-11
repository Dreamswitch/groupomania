/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const user = sequelize.define('user', {
    idusers: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    firstname: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    lastname: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: true,
      unique: "userEmail_UNIQUE"
    },
    userPassword: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    admin: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'user',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idusers" },
        ]
      },
      {
        name: "userEmail_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
    ]
  });
  user.associate = function(models) {
    models.user.hasMany(models.comment, { foreignKey: "idusers"});
    models.user.hasMany(models.like, { foreignKey: "idusers"});
    models.user.hasMany(models.publication, { foreignKey: "idusers"});
  };
  return user;
};
