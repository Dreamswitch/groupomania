const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const path = require('path');
const helmet = require("helmet");
const dotenv = require('dotenv').config();
const config = require(__dirname + '/./config/config.json')['development'];

const userRoutes = require('./routes/user');
const publicationRoutes = require('./routes/publication');


// connexion DB
const sequelize = new Sequelize(config.database, config.username, config.password, config);
//confirmation DB connexion ON
try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}


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