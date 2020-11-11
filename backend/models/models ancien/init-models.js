var DataTypes = require("sequelize").DataTypes;
var _comment = require("./comment");
var _like = require("./like");
var _publication = require("./publication");
var _user = require("./user");

function initModels(sequelize) {
  var comment = _comment(sequelize, DataTypes);
  var like = _like(sequelize, DataTypes);
  var publication = _publication(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  comment.belongsTo(user, { foreignKey: "idusers"});
  user.hasMany(comment, { foreignKey: "idusers"});
  comment.belongsTo(publication, { foreignKey: "idpublications"});
  publication.hasMany(comment, { foreignKey: "idpublications"});
  like.belongsTo(publication, { foreignKey: "idpublications"});
  publication.hasMany(like, { foreignKey: "idpublications"});
  like.belongsTo(user, { foreignKey: "idusers"});
  user.hasMany(like, { foreignKey: "idusers"});
  publication.belongsTo(user, { foreignKey: "idusers"});
  user.hasMany(publication, { foreignKey: "idusers"});

  return {
    comment,
    like,
    publication,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
