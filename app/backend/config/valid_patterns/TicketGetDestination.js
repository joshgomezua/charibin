'use strict';

const ROLE = global.config.custom.roles;

module.exports = {
  ticketgetdestination: {
    departure: {
      type: 'string',
      required: true,
      permission: {
        create: [ROLE.ADMINISTRATOR],
        update: [],
        find: []
      }
    },
    destination: {
      type: 'string',
      required: true,
      permission: {
        create: [ROLE.ADMINISTRATOR],
        update: [],
        find: []
      }
    }
  }
};
