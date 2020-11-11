/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const publication = sequelize.define('publication', {
    idpublications: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(70),
      allowNull: false
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
    }
  }, {
    sequelize,
    tableName: 'publication',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idpublications" },
          { name: "idusers" },
        ]
      },
      {
        name: "fk_publication_user1_idx",
        using: "BTREE",
        fields: [
          { name: "idusers" },
        ]
      },
    ]
  });
  publication.associate = function (models) {
    models.publication.belongsTo(models.user, { foreignKey: "idusers" });
    models.publication.hasMany(models.comment, { foreignKey: "idpublications"});
    models.publication.hasMany(models.like, { foreignKey: "idpublications"});
  };
  return publication;
};
