'use strict';

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

var initModels = require("../models/init-models").initModels;
// create sequelize instance with database connection
var sequelize = new Sequelize(config.database, config.username, config.password, config);
// load the model definitions into sequelize
console.log(initModels);
var db = initModels(sequelize);

module.exports = db;
