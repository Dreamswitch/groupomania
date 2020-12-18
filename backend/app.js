const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const helmet = require("helmet");
const dotenv = require('dotenv').config();
const cookieParser = require("cookie-parser");
/* const cors = require('cors'); */

const userRoutes = require('./routes/user');
const publicationRoutes = require('./routes/publication');


// make an express api
const app = express();

// allow to read cookies on the req
app.use(cookieParser());

// easy use body request 
app.use(bodyParser.json());

//header's request protection
app.use(helmet());


/* app.use(cors({ credentials: true, origin: 'http://localhost:4200' })); */
// cors
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

// media path on the server
app.use('/images', express.static(path.join(__dirname, 'images')));



app.use('/api/auth', userRoutes);
app.use('/api/publications', publicationRoutes);

module.exports = app;