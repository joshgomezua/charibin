'use strict';

const ROLE = global.config.custom.roles;

module.exports = {
  ticketgetcrm: {
    dateStart: {
      type: 'timestamp',
      required: true,
      permission: {
        create: [ROLE.ADMINISTRATOR],
        update: [],
        find: []
      }
    },
    dateEnd: {
      type: 'timestamp',
      required: true,
      permission: {
        create: [ROLE.ADMINISTRATOR],
        update: [],
        find: []
      }
    }
  }
};
