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
var ObjectId = require('mongoose').Types.ObjectId;

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
const cities = [];
let usedCities = [];
loadServices();
loadModels();
const PHOTO_DIR_PATH = './city_photos/';

if (!fs.existsSync(PHOTO_DIR_PATH)) {
  fs.mkdirSync(PHOTO_DIR_PATH);
  fs.chmodSync(PHOTO_DIR_PATH, '777');
}

(async function () {
  // Clean up
  for (const collection of Object.keys(mongoose.connection.collections))
    await mongoose.connection.collections[collection].drop((err) => console.log(`${collection} ${err
      ? 'does not exist' : 'dropped' }`));
  
  
  
  await helpers.createUser(globals.data.administrator);
  console.log(`Create administrator: ${globals.data.administrator.email} ${globals.data.administrator.password}`);
  
  const trips = [];
  
  //Creating cities
  for (let i = 0; i < 20; i++) {

    console.log(`Creating Cities: ${i + 1}/${20}`);
    let cityTemp = await helpers.dataClone(globals.dataTemplate.city);
    cityTemp.photo = createPhoto(cityTemp);
    console.log('city.photo', cityTemp.photo);
    
    const city = await helpers.createCity(cityTemp);
    cities.push(city);
    // console.log(`Creating Users: ${i + 1}/${20}`);
    // await helpers.createUser(helpers.dataClone(globals.dataTemplate.user));
  }

  // Create trips and tickets
  for (let i = 0; i < 5; i++) {
    const departureCity = getRandomCities();
    const destinationCity = getRandomCities();
    const tripArrival = await helpers.createTrip({...helpers.dataClone(globals.dataTemplate.trip), 
    departure: {
      _id: departureCity._id,
      name: departureCity.name,
      country: departureCity.country,
      photo: departureCity.photo,
      tags: departureCity.tags,
      isManual: departureCity.isManual,
      isEnabled: departureCity.isEnabled
    },
    destination: {
      _id: destinationCity._id,
      name: destinationCity.name,
      country: destinationCity.country,
      photo: destinationCity.photo,
      tags: destinationCity.tags,
      isManual: destinationCity.isManual,
      isEnabled: destinationCity.isEnabled
    },
    });
    const tripDeparture = await helpers.createTrip({...helpers.dataClone(globals.dataTemplate.trip), 
      destination: {
        _id: departureCity._id,
        name: departureCity.name,
        country: departureCity.country,
        photo: departureCity.photo,
        tags: departureCity.tags,
        isManual: departureCity.isManual,
        isEnabled: departureCity.isEnabled
      },
      departure: {
        _id: destinationCity._id,
        name: destinationCity.name,
        country: destinationCity.country,
        photo: destinationCity.photo,
        tags: destinationCity.tags,
        isManual: destinationCity.isManual,
        isEnabled: destinationCity.isEnabled
      },
      });

    trips.push(tripArrival);
    trips.push(tripDeparture);
    console.log(`Creating Trips: ${i + 1}/${5}`);

    // Create tickets
    for (let j = 0; j < 1; j++) {
    const ticketArrivalTemp = { ...helpers.dataClone(globals.dataTemplate.ticket), 
      trip: ObjectId(tripArrival._id),
      departure: tripArrival.departure.name,
      destination: tripArrival.destination.name,
      adultPrice: tripArrival.adultPrice,
      childPrice: tripArrival.childPrice
    };
    const ticketArrival = await helpers.createTicket(ticketArrivalTemp);

    const ticketDepartureTemp = {
        ...helpers.dataClone(globals.dataTemplate.ticket),
        date: {
          start: new Date(ticketArrival.date.start.getTime() + global.config.custom.time.day7).getTime(),
          end: new Date(ticketArrival.date.end.getTime() + global.config.custom.time.day7).getTime()
        },
        trip: ObjectId(tripDeparture._id),
        departure: tripDeparture.departure.name,
        destination: tripDeparture.destination.name,
        adultPrice: tripDeparture.adultPrice,
        childPrice: tripDeparture.childPrice
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

  cities.forEach((city) => {
    console.log('city', city.photo);
  })
  
  process.exit(0);
})();

function getRandomCities(){
  let city = {}
  do {
    city = cities[Math.floor(Math.random() * cities.length)];
  }while(usedCities.includes(city))
  usedCities.push(city);
  return city;
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

function createPhoto (data) {
  const PHOTO_DIR_PATH = './city_photos/';
  const PHOTO_ENCODING = 'Base64';
  const indexOfData = data.photo.indexOf(',') + 1;
    const photo = data.photo.substring(indexOfData);
    const country = data.country.replace(' ', '_');
    const name = data.name.replace(' ', '_');

    const photoDirPath = PHOTO_DIR_PATH + country + '/';
    const photoPath = photoDirPath + name + '.png';
  
    if (!fs.existsSync(photoDirPath)) {
        fs.mkdirSync(photoDirPath);
        fs.chmodSync(photoDirPath, '777');
    }

    fs.writeFile(photoPath, photo, { encoding: PHOTO_ENCODING }, (err) => {
      if (err) {
        console.error(err)
      } else {
        fs.chmodSync(photoPath, '777');
        console.log('photo saving successful')
      } 
    });

    return photoPath;
}


function connect () {
  const options = { keepAlive: 1, useNewUrlParser: true };
  const { user, password, host, port, name } = global.config.connection.database;
  
  return mongoose.connect(`mongodb://mongo:27017/db?authSource=admin`, {
  useNewUrlParser: true,
  user: 'username',
  pass: 'password',
  keepAlive: true,
  });
}
