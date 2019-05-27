'use strict';

const ROLE = global.config.custom.roles;

module.exports = {
  ticketunbooking: {
    owner: {
      type: 'string',
      required: true,
      permission: {
        create: [ROLE.ADMINISTRATOR, ROLE.GUEST],
        update: [],
        find: []
      },
      maxLength: 256
    },

    trips: {
      type: 'array',
      maxLen: 3,
      minLen: 1,
      required: true,
      subType: 'id',
      permission: {
        create: [ROLE.ADMINISTRATOR, ROLE.GUEST],
        update: [],
        find: []
      }
    }
  }
};
