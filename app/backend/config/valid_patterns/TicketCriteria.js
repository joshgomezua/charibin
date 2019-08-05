'use strict';

const ROLE = global.config.custom.roles;

module.exports = {
  ticketcriteria: {
    page: {
      type: 'number',
      required: true,
      permission: {
        create: [ROLE.ADMINISTRATOR, ROLE.GUEST],
        update: [],
        find: []
      },
      min: 0,
      max: 1000,
    },

    limit: {
      type: 'number',
      required: true,
      permission: {
        create: [ROLE.ADMINISTRATOR, ROLE.GUEST],
        update: [],
        find: []
      },
      min: 1,
      max: 1000,
    },

    priceStart: {
      type: 'number',
      required: true,
      permission: {
        create: [ROLE.ADMINISTRATOR, ROLE.GUEST],
        update: [],
        find: []
      },
      min: 0,
      max: 1000000,
    },

    priceEnd: {
      type: 'number',
      required: true,
      permission: {
        create: [ROLE.ADMINISTRATOR, ROLE.GUEST],
        update: [],
        find: []
      },
      min: 0,
      max: 1000000,
    },

    dateStart: {
      type: 'timestamp',
      required: true,
      permission: {
        create: [ROLE.ADMINISTRATOR, ROLE.GUEST],
        update: [],
        find: []
      }
    },

    dateEnd: {
      type: 'timestamp',
      required: true,
      permission: {
        create: [ROLE.ADMINISTRATOR, ROLE.GUEST],
        update: [],
        find: []
      }
    },

    adult: {
      type: 'number',
      required: true,
      permission: {
        create: [ROLE.ADMINISTRATOR, ROLE.GUEST],
        update: [],
        find: []
      },
      min: 0,
      max: 6,
    },

    youth: {
      type: 'number',
      required: true,
      permission: {
        create: [ROLE.ADMINISTRATOR, ROLE.GUEST],
        update: [],
        find: []
      },
      min: 0,
      max: 6,
    },

    timezone: {
      type: 'number',
      required: true,
      permission: {
        create: [ROLE.ADMINISTRATOR, ROLE.GUEST],
        update: [],
        find: []
      },
    },
  }
};
