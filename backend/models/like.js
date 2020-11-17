/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
return sequelize.define('like', {
    idlike: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    like: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 0
    },
    idpublications: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'publication',
        key: 'idpublications'
      }
    },
    idusers: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'idusers'
      }
    }
  }, {
    sequelize,
    tableName: 'like',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idlike" },
          { name: "idpublications" },
          { name: "idusers" },
        ]
      },
      {
        name: "fk_like_publication1_idx",
        using: "BTREE",
        fields: [
          { name: "idpublications" },
        ]
      },
      {
        name: "fk_like_user1_idx",
        using: "BTREE",
        fields: [
          { name: "idusers" },
        ]
      },
    ]
  });
};
