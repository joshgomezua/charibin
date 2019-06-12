'use strict';

module.exports = require('lodash').merge(
  require('./User'),
  require('./Trip'),
  require('./Stripe'),
  require('./Ticket'),
  require('./TicketOwner'),
  require('./Data'),
  require('./Order'),
  require('./City')
);
