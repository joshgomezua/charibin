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
    },
    from: {
      type: 'string',
      required: true,
      permission: {
        create: [ROLE.ADMINISTRATOR],
        update: [],
        find: []
      }
    },
    to: {
      type: 'string',
      required: true,
      permission: {
        create: [ROLE.ADMINISTRATOR],
        update: [],
        find: []
      }
    },
    carrier: {
      type: 'string',
      required: true,
      permission: {
        create: [ROLE.ADMINISTRATOR],
        update: [],
        find: []
      }
    },
    page: {
      type: 'number',
      required: true,
      permission: {
        create: [ROLE.ADMINISTRATOR],
        update: [],
        find: []
      }
    },
    limit: {
      type: 'number',
      required: true,
      permission: {
        create: [ROLE.ADMINISTRATOR],
        update: [],
        find: []
      }
    },
  }
};
