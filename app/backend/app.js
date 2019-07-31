'use strict';

const app = require('express')();
const mongoose = require('mongoose');
const cors = require('cors');
const isLoggedIn = require('./api/middlewares/isLoggedIn');
const formidable = require('./api/middlewares/formidable');
const preRun = require('./api/helpers/preRun');
const dotenv = require('dotenv');
const SocketService = require('./api/services/SocketService');
const helmet = require('helmet');

// Load .env file
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

// Set config for global use
global.log = require('./config/logger');
global.config = require('./config');

connect().then(
  () => global.log.info(`Connected to Mongo at: ${new Date()}`),
  err => global.log.error(err)
);

function connect () {
  const options = { keepAlive: 1, useNewUrlParser: true };
  // const { user, password, host, port, name } = global.config.connection.database;
  
  //return mongoose.connect(`mongodb+srv://ericchao:ShxJNUGZFNOuWHVc@sponteous-dev-rjoqe.mongodb.net/Sponteous`, options);
  return mongoose.connect(`mongodb://mongo:27017/db?authSource=admin`, {
  useNewUrlParser: true,
  user: 'username',
  pass: 'password',
  keepAlive: true,
  }); 
}

// Every time when req comming clear console screen
if(process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    process.stdout.write('\x1B[2J');
    next();
  });
}

preRun.loadValidPatterns('config/valid_patterns');
preRun.loadResponses('api/responses', app);

app.use(helmet({
  noCache: process.env.NODE_ENV !== 'production' ? true : false
}));
app.use(cors());
app.use(formidable);
app.use(isLoggedIn);

mongoose.set('useCreateIndex', true); //force to use proper methods for index
mongoose.set('useFindAndModify', false); //force to use proper methods for find

preRun.loadModules('api/controllers', app);

//Listener.
app.listen(3001, function () {
  global.log.info(`App port ${this.address().port}!`);
});
