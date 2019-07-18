'use strict';
const stripe = require('stripe')(global.config.connection.stripe.apiKey);
stripe.setApiVersion(global.config.connection.stripe.apiVer);

module.exports = {
  async charge (amount, creditCardToken, { email, firstName, middleName, lastName, birthDate, phone, address, city, zipCode }, selectedTrip) {
    try {
      const charge = await stripe.charges.create({
        amount: (amount * 100).toFixed(0),
        currency: 'GBP',
        source: creditCardToken,
        receipt_email: email,// eslint-disable-line
        description: `Fee for a trip to ${selectedTrip.trip.destination.name} scheduled for ${new Date(+selectedTrip.arrivalTicket.date.start).toDateString()}`,
        metadata: {
          'First name': firstName, // eslint-disable-line
          'Middle name': middleName, // eslint-disable-line
          'Last name': lastName, // eslint-disable-line
          'Phone': phone,
          'Date of birth': new Date(+birthDate), // eslint-disable-line
          'Email': email,
          'Address': address,
          'City': city,
          'Zip code': zipCode // eslint-disable-line
        }
      });

      return charge;
    } catch (err) {
      throw { status: 'stripe', message: err };
    }
  }
};
