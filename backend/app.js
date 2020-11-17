const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const helmet = require("helmet");
const dotenv = require('dotenv').config();

const userRoutes = require('./routes/user');
const publicationRoutes = require('./routes/publication');


/* const Sequelize = require('sequelize');
var config = require(__dirname + '/./config/config.json')['development'];
var initModels = require("./models/init-models").initModels; 
// create sequelize instance with database connection
var sequelize = new Sequelize(config.database, config.username, config.password, config);
// load the model definitions into sequelize
console.log(initModels);
var db = initModels(sequelize); */

/* db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
  }); */

// make an express api
const app = express();

// easy use body request 
app.use(bodyParser.json());

//header's request protection
app.use(helmet());

// cors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// media path on the server
app.use('/images', express.static(path.join(__dirname, 'images')));



app.use('/api/auth', userRoutes);
app.use('/api/publications', publicationRoutes);

module.exports = app;