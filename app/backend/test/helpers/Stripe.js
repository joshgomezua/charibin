'use strict';
const stripe = require('stripe')(global.config.connection.stripe.apiKey);
stripe.setApiVersion(global.config.connection.stripe.apiVer);

module.exports = {
  async findChargeById (id) {
    return stripe.charges.retrieve(id);
  }
};
