'use strict';

const fs = require('fs');
const mongoose = require('mongoose');
const app = require('express')();
const testConfig = require('./config');
const cors = require('cors');
const preRun = require('../api/helpers/preRun');
const isLoggedIn = require('../api/middlewares/isLoggedIn');
const formidable = require('../api/middlewares/formidable');
const dotenv = require('dotenv');
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
global.config = require('../config');

const helpers = require('./helpers');

global.log = require('../config/logger');
const connection = connect();
connection.then(
  () => global.log.info(`Connected to Mongo at: ${new Date()}`),
  err => global.log.error(err)
);

preRun.loadValidPatterns('config/valid_patterns');
preRun.loadResponses('api/responses', app);
app.use(cors());
app.use(formidable);
app.use(isLoggedIn);
preRun.loadModules('api/controllers', app);

mongoose.set('useCreateIndex', true); //force to use proper methods for index
mongoose.set('useFindAndModify', false); //force to use proper methods for find

app.listen(testConfig.port, function () {
  global.log.info(`App port: ${this.address().port}!`);
});

const globals = {
  dataTemplate: testConfig.dataTemplate,
  data: helpers.createData(testConfig.dataTemplate),
};

loadServices();
loadModels();

(async function () {
  // Clean up
  for (const collection of Object.keys(mongoose.connection.collections))
    await mongoose.connection.collections[collection].drop((err) => console.log(`${collection} ${err
      ? 'does not exist' : 'dropped' }`));

  const trips = [];
  await helpers.createUser(globals.data.administrator);
  console.log(`Create administrator: ${globals.data.administrator.email} ${globals.data.administrator.password}`);

  // Create trips and tickets
  for (let i = 0; i < 5; i++) {
    trips.push(await helpers.createTrip({...helpers.dataClone(globals.dataTemplate.trip), 
    departure: getRandomCities(),
    destination: getRandomCities(),
    }));
    console.log(`Creating Trips: ${i + 1}/${5}`);

    // Create tickets
    for (let j = 0; j < 1; j++) {
    const ticketArrivalTemp = { ...helpers.dataClone(globals.dataTemplate.ticket), 
      trip: trips[i]._id,
      departure: trips[i].departure,
      destination: trips[i].destination
    };
    const ticketArrival = await helpers.createTicket(ticketArrivalTemp);

    const ticketDepartureTemp = {
        ...helpers.dataClone(globals.dataTemplate.ticket),
        date: {
          start: new Date(ticketArrival.date.start.getTime() + global.config.custom.time.day7).getTime(),
          end: new Date(ticketArrival.date.end.getTime() + global.config.custom.time.day7).getTime()
        },
        trip: trips[i]._id,
        departure: trips[i].destination,
        destination: trips[i].departure
      };
    const ticketDeparture = await helpers.createTicket(ticketDepartureTemp)



      process.stdout.clearLine();
      process.stdout.cursorTo(0);
      process.stdout.write(`\tCreating Tickets: ${j + 1}/${10}`);
      //console.log(JSON.stringify(ticket))
    }
    process.stdout.write('\n');
  }

  for (let i = 0; i < 20; i++) {
    console.log(`Creating Orders: ${i + 1}/${20}`);
    await helpers.createOrder(helpers.dataClone(globals.dataTemplate.order));
  }

  for (let i = 0; i < 20; i++) {
    console.log(`Creating Cities: ${i + 1}/${20}`);
    await helpers.createCity(helpers.dataClone(globals.dataTemplate.city));
  }

  process.exit(0);
})();

function getRandomCities(){
  const cities = ["Montreal", "Toronto", "Ottawa", "Quebec", "Ontario", "Vancouver",
"Paris", "Marseille", "Lyon", "Toulouse", "Nice", "Nantes",
"London", "Manchester", "Bristol"];

  return cities[Math.floor(Math.random() * cities.length)];
}
function getQuantity(ticket) {
  return ticket.quantity;
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
  const options = { keepAlive: 1, useNewUrlParser: true };
  const { user, password, host, port, name } = global.config.connection.database;
  return mongoose.connect(`mongodb://mongo:27017/db?authSource=admin`, {
  useNewUrlParser: true,
  user: 'admin',
  pass: 'admin',
  keepAlive: true,
});
}
