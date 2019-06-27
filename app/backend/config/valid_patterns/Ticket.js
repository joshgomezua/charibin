'use strict';

const ROLE = global.config.custom.roles;

module.exports = {
  ticket: {
    _id: {
      type: 'string',
      required: false,
      permission: {
        create: [],
        update: [],
        find: [ROLE.ADMINISTRATOR, ROLE.GUEST]
      },
    },

    __v: {
      type: 'number',
      required: false,
      permission: {
        create: [],
        update: [],
        find: [ROLE.ADMINISTRATOR, ROLE.GUEST]
      },
    },

    trip: {
      type: 'id',
      required: true,
      permission: {
        create: [ROLE.ADMINISTRATOR],
        update: [ROLE.ADMINISTRATOR],
        find: [ROLE.ADMINISTRATOR, ROLE.GUEST]
      }
    },

    quantity: {
      type: 'number',
      required: true,
      permission: {
        create: [ROLE.ADMINISTRATOR],
        update: [ROLE.ADMINISTRATOR],
        find: [ROLE.ADMINISTRATOR, ROLE.GUEST]
      },
      min: 1,
      max: 1000,
    },


    type: {
      type: 'string',
      required: true,
      permission: {
        create: [ROLE.ADMINISTRATOR],
        update: [ROLE.ADMINISTRATOR],
        find: [ROLE.ADMINISTRATOR, ROLE.GUEST]
      },
      pattern: new RegExp(`^(${global.config.custom.ticket.type.join('|')})$`)
    },

    date: {
      type: 'object',
      required: true,
      permission: {
        create: [ROLE.ADMINISTRATOR],
        update: [ROLE.ADMINISTRATOR],
        find: [ROLE.ADMINISTRATOR, ROLE.GUEST]
      },

      attributes: {
        start: {
          type: 'timestamp',
          required: true,
          permission: {
            create: [ROLE.ADMINISTRATOR],
            update: [ROLE.ADMINISTRATOR],
            find: [ROLE.ADMINISTRATOR, ROLE.GUEST]
          }
        },

        end: {
          type: 'timestamp',
          required: true,
          permission: {
            create: [ROLE.ADMINISTRATOR],
            update: [ROLE.ADMINISTRATOR],
            find: [ROLE.ADMINISTRATOR, ROLE.GUEST]
          }
        }
      }
    },

    repeat: {
      type: 'object',
      required: false,
      permission: {
        create: [ROLE.ADMINISTRATOR],
        update: [],
        find: []
      },

      attributes: {
        dateEnd: {
          type: 'timestamp',
          required: true,
          permission: {
            create: [ROLE.ADMINISTRATOR],
            update: [],
            find: []
          }
        },

        days: {
          type: 'array',
          subType: 'number',
          required: true,
          minLen: 1,
          maxLen: 7,
          permission: {
            create: [ROLE.ADMINISTRATOR],
            update: [],
            find: []
          },
          min: 0,
          max: 6
        }
      }
    },

    active: {
      type: 'boolean',
      required: false,
      permission: {
        create: [ROLE.ADMINISTRATOR],
        update: [ROLE.ADMINISTRATOR],
        find: [ROLE.ADMINISTRATOR]
      }
    },

    deleted: {
      type: 'boolean',
      required: false,
      permission: {
        create: [],
        update: [],
        find: []
      }
    },

    blockedQuantity: {
      type: 'array',
      required: false,
      permission: {
        create: [],
        update: [],
        find: [ROLE.ADMINISTRATOR]
      }
    },

    createdAt: {
      type: 'timestamp',
      required: false,
      permission: {
        create: [],
        update: [],
        find: [ROLE.ADMINISTRATOR]
      }
    }
  }
};
