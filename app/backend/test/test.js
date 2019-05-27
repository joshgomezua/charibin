'use strict';

const fs = require('fs');
const chai = require('chai');
chai.use(require('chai-http'));
const mongoose = require('mongoose');
const app = require('express')();
const testConfig = require('./config');
const cors = require('cors');
const preRun = require('../api/helpers/preRun');
const isLoggedIn = require('../api/middlewares/isLoggedIn');
const formidable = require('../api/middlewares/formidable');
const _ = require('lodash');
const dotenv = require('dotenv');
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
global.config = require('../config');

const helpers = require('./helpers');

global.log = require('../config/logger');
const connection = connect();

// Run server & DB
connection.then(
  () => global.log.info(`Connected to Mongo at: ${new Date()}`),
  err => global.log.error(err)
);

preRun.loadValidPatterns('config/valid_patterns');
preRun.loadResponses('api/responses', app);
app.use(cors());
app.use(formidable);
app.use(isLoggedIn);
mongoose.set('useCreateIndex', true); //force to use proper methods for index
mongoose.set('useFindAndModify', false); //force to use proper methods for find
preRun.loadModules('api/controllers', app);

app.listen(testConfig.port, function () {
  global.log.info(`App port: ${this.address().port}!`);
});

// Create Test env
const tests = [];
const globals = {
  compare,
  createdAgo,
  helpers,
  should: chai.should(),
  server: chai.request(app).keepOpen(),
  dataTemplate: testConfig.dataTemplate,
  compareBlackList: testConfig.compareBlackList,
  data: helpers.createData(testConfig.dataTemplate),
};

loadServices();
loadModels();
if(process.env.TEST_MODE === 'pentest')
  loadTests('penetrations');
else {
  loadTests('unit');
  loadTests('integration');
}

describe('viDent: ', () => {
  describe('Test start: ', () => {
    tests.forEach(test => test(globals));
  });
});

function loadTests (directory) {
  const dirPath = `./test/${directory}`.split('/').filter(str => str.length);
  const dirPathStr = dirPath.join('/');

  const fileNames = fs.readdirSync(dirPathStr);
  for (let file of fileNames) {
    const testPath = [...dirPath.slice(2), file].join('/');
    tests.push(require(`./${testPath}`));
  }
}

function loadServices () {
  const dirPath = './api/services/';
  const services = {};

  const fileNames = fs.readdirSync(dirPath);
  for (let file of fileNames) {
    const servicePath = `../api/services/${file}`;
    const serviceName = file.replace(/\.js$/, '');
    services[serviceName] = require(servicePath);
  }

  globals.services = services;
}

function loadModels () {
  const dirPath = './api/models';
  const models = {};

  const fileNames = fs.readdirSync(dirPath);
  for (let file of fileNames) {
    const modelPath = `../api/models/${file}`;
    const modelName = file.replace(/\.js$/, '');
    models[modelName] = require(modelPath);
  }

  globals.models = models;
}

function connect () {
  const options = { keepAlive: 1, useNewUrlParser: true  };
  const { user, password, host, port, name } = global.config.connection.database;
  return mongoose.connect(`mongodb://${user}:${password}@${host}:${port}/${name}`, options);
}

function compare (obj, data, omit = []) {
  let match = true;
  const blacklist = testConfig.compareBlackList;

  for (let prop in data) {
    if (blacklist.includes(prop) || omit.includes(prop)) continue;
    if (_.isEqual(obj[prop], data[prop])) continue;

    if (Array.isArray(obj[prop])) {
      if (_.isEqual(obj[prop].sort(e => e._id), data[prop].sort(e => e._id))) continue;
    }

    if (typeof obj[prop] === 'object' && obj[prop]) {
      if (compare(obj[prop], data[prop], omit)) continue;
    }

    global.log.warn(`Compare failed for property: ${prop}. Types: [${typeof obj[prop]}, ${typeof data[prop]}]`);
    console.warn('Copy: ', obj[prop]);
    console.warn('Source: ', data[prop]);
    global.log.warn(`Equal: ${obj[prop] === data[prop]}`);
    match = false;
    break;
  }

  return match;
}

function createdAgo (min, max = 0) {
  const hour = 60 * 60 * 1000;
  return new Date(Date.now() - ((min * hour ) + ~~(Math.random() * ((max - min) * hour)))).getTime();
}
