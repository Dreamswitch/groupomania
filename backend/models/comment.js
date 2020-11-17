/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('comment', {
    idcomments: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    media: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    idusers: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'idusers'
      }
    },
    idpublications: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'publication',
        key: 'idpublications'
      }
    }
  }, {
    sequelize,
    tableName: 'comment',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idcomments" },
          { name: "idusers" },
          { name: "idpublications" },
        ]
      },
      {
        name: "fk_comment_user1_idx",
        using: "BTREE",
        fields: [
          { name: "idusers" },
        ]
      },
      {
        name: "fk_comment_publication1_idx",
        using: "BTREE",
        fields: [
          { name: "idpublications" },
        ]
      },
    ]
  });
};
