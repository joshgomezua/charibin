'use strict';

const faker = require('faker');

const dataTemplate = {
  administrator: {
    email: 'admin@user.com',
    role: 'Administrator',
    password: '22AA@@aaasasd'
  },

  trip: {
    name: faker.address.city,
    photo: getImage,
    price: () => faker.random.number({ min: 100, max: 200 }) + 0.99,
    discount: () => faker.random.number({ min: 5, max: 40 }) + 0.95,
    duration: () => faker.random.number({ min: 1, max: 100 }),
    deselectionPrice: () => faker.random.number({ min: 3, max: 10 }) + 0.93
  },

  city: {
    name: faker.address.city,
    country: () => faker.name.lastName(),
    photo: getImage,
    tags: () => [faker.name.firstName()]

  },

  ticket: {
    direction: 'arrival',
    quantity: () => faker.random.number({ min: 5, max: 20 }),
    type: () => randomOneWord('type'),
    date: {
      __tmpStart: 0,
      start: function () {
        const tmpDate = faker.date.future().getTime();
        this.__tmpStart = tmpDate;
        return tmpDate;
      },
      end: function () {
        return this.__tmpStart + (5 * 60 * 60 * 1000); // add 5 hours
      }
    }
  },

  buyerInfo: {
    email: faker.internet.exampleEmail,
    firstName: faker.name.firstName,
    middleName: faker.name.firstName,
    lastName: faker.name.lastName,
    birthDate: () => `${+faker.date.past()}`,
    phone: '+48 123 123 123',
    address: faker.address.streetAddress,
    city: faker.address.city,
    zipCode: faker.address.zipCode,
  },

  support: {
    email: faker.internet.exampleEmail,
    firstName: faker.name.firstName,
    lastName: faker.name.lastName,
    phone: '+48 123 123 123',
    message: faker.lorem.paragraph
  },

  order: {
    buyer: {
      name: faker.name.firstName,
      email: faker.internet.exampleEmail,
      phone: faker.phone.phoneNumber,
      birthDate: () => faker.date.past().getTime(),
      address: faker.address.streetAddress,
      city: faker.address.city,
      zipCode: faker.address.zipCode,
    },
    stripeChargeId: faker.helpers.replaceSymbolWithNumber('#############'),
    selected: () => ['', '', '', ''].map(() => faker.address.city()).join(', '),
    deselected: faker.address.city,
    finalSelection: faker.address.city,
    finalDestination: faker.address.city,
    date: {
      arrival: {
        start: faker.date.recent().getTime(),
        end: () => faker.date.future().getTime(),
      },
      departure: {
        start: faker.date.recent().getTime(),
        end: () => faker.date.future().getTime(),
      }
    },
    quantity: () => faker.random.number({ min: 1, max: 10 }),
    ticketPrice: () => faker.random.number({ min: 100, max: 1000 }),
    arrivalTimePrice: faker.random.number({ min: 1, max: 5 }),
    departureTimePrice: faker.random.number({ min: 1, max: 5 }),
    deselectionPrice: () => faker.random.number({ min: 1, max: 100 }),
    totalPrice: () => faker.random.number({ min: 100, max: 1000 }),
  },
};

function wordsArray (category) {
  const options = {
    type: global.config.custom.ticket.type
  };
  const arr = options[category].filter(() => !~~(0.5 + Math.random()));
  return arr.length ? arr : wordsArray(category);
}

function randomOneWord (category) {
  const words = wordsArray(category);
  return words.length ? words[0] : randomOneWord(category);
}

function getImage () {
  return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==';
}

module.exports = {
  dataTemplate,
  port: 3333,
  compareBlackList: [
    '_id',
    '__v',
    'password',
    'createdAt',
  ]
};
