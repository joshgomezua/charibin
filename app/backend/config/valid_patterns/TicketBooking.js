'use strict';

const ROLE = global.config.custom.roles;

module.exports = {
  ticketbooking: {
    ownerHash: {
      type: 'string',
      required: false,
      permission: {
        create: [ROLE.ADMINISTRATOR, ROLE.GUEST],
        update: [],
        find: []
      },
      maxLength: 100
    },

    Adult: {
      type: 'number',
      required: true,
      permission: {
        create: [ROLE.ADMINISTRATOR, ROLE.GUEST],
        update: [],
        find: []
      },
    },

    Youth: {
      type: 'number',
      required: true,
      permission: {
        create: [ROLE.ADMINISTRATOR, ROLE.GUEST],
        update: [],
        find: []
      },
    },

    trips: {
      type: 'array',
      maxLen: 5,
      minLen: 5,
      required: true,
      subType: 'object',
      permission: {
        create: [ROLE.ADMINISTRATOR, ROLE.GUEST],
        update: [],
        find: []
      },
      attributes: {
        id: {
          type: 'id',
          required: false,
          permission: {
            create: [ROLE.ADMINISTRATOR, ROLE.GUEST],
            update: [],
            find: []
          },
        },

        dateStart: {
          type: 'timestamp',
          required: false,
          permission: {
            create: [ROLE.ADMINISTRATOR, ROLE.GUEST],
            update: [],
            find: []
          }
        },

        dateEnd: {
          type: 'timestamp',
          required: false,
          permission: {
            create: [ROLE.ADMINISTRATOR, ROLE.GUEST],
            update: [],
            find: []
          }
        },

        arrivalTicket: {
          type: 'id',
          required: false,
          permission: {
            create: [ROLE.ADMINISTRATOR, ROLE.GUEST],
            update: [],
            find: []
          },
        },

        departureTicket: {
          type: 'id',
          required: false,
          permission: {
            create: [ROLE.ADMINISTRATOR, ROLE.GUEST],
            update: [],
            find: []
          }
        },
      }
    }
  }
};
