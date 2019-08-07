'use strict';

const ROLE = global.config.custom.roles;

module.exports = {
  scheduledtrip: {
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

    fake: {
      type: 'boolean',
      required: false,
      permission: {
        create: [ROLE.ADMINISTRATOR],
        update: [ROLE.ADMINISTRATOR],
        find: [ROLE.ADMINISTRATOR]
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

    adultPrice: {
      type: 'number',
      required: true,
      permission: {
        create: [ROLE.ADMINISTRATOR],
        update: [ROLE.ADMINISTRATOR],
        find: [ROLE.ADMINISTRATOR, ROLE.GUEST]
      },
      min: 0,
      max: 1000000,
    },

    childPrice: {
      type: 'number',
      required: true,
      permission: {
        create: [ROLE.ADMINISTRATOR],
        update: [ROLE.ADMINISTRATOR],
        find: [ROLE.ADMINISTRATOR, ROLE.GUEST]
      },
      min: 0,
      max: 1000000,
    },

    discount: {
      type: 'number',
      required: true,
      permission: {
        create: [ROLE.ADMINISTRATOR],
        update: [ROLE.ADMINISTRATOR],
        find: [ROLE.ADMINISTRATOR, ROLE.GUEST]
      },
      min: 0,
      max: 100,
    },

    duration: {
      type: 'number',
      required: true,
      permission: {
        create: [ROLE.ADMINISTRATOR],
        update: [ROLE.ADMINISTRATOR],
        find: [ROLE.ADMINISTRATOR, ROLE.GUEST]
      },
      min: 1,
      max: 100000,
    },

    deleted: {
      type: 'boolean',
      required: false,
      permission: {
        create: [ROLE.ADMINISTRATOR],
        update: [ROLE.ADMINISTRATOR],
        find: [ROLE.ADMINISTRATOR]
      }
    },

    deselectionPrice: {
      type: 'number',
      required: true,
      permission: {
        create: [ROLE.ADMINISTRATOR],
        update: [ROLE.ADMINISTRATOR],
        find: [ROLE.ADMINISTRATOR, ROLE.GUEST]
      },
      min: 0,
      max: 1000000,
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
            type: 'string',
            required: true,
            permission: {
              create: [ROLE.ADMINISTRATOR],
              update: [ROLE.ADMINISTRATOR],
              find: [ROLE.ADMINISTRATOR, ROLE.GUEST]
            }
          },
  
          end: {
            type: 'string',
            required: true,
            permission: {
              create: [ROLE.ADMINISTRATOR],
              update: [ROLE.ADMINISTRATOR],
              find: [ROLE.ADMINISTRATOR, ROLE.GUEST]
            }
          }
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
