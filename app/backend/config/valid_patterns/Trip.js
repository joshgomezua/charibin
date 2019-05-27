'use strict';

const ROLE = global.config.custom.roles;

module.exports = {
  trip: {
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

    name: {
      type: 'string',
      required: true,
      permission: {
        create: [ROLE.ADMINISTRATOR],
        update: [ROLE.ADMINISTRATOR],
        find: [ROLE.ADMINISTRATOR, ROLE.GUEST]
      },
      minLength: 1,
      maxLength: 40,
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

    photo: {
      type: 'string',
      required: true,
      permission: {
        create: [ROLE.ADMINISTRATOR],
        update: [ROLE.ADMINISTRATOR],
        find: [ROLE.ADMINISTRATOR, ROLE.GUEST]
      },
      maxLength: 7340032, // 5MB image in binary
    },

    price: {
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
        create: [],
        update: [],
        find: []
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

    tickets: {
      type: 'array',
      required: false,
      permission: {
        create: [],
        update: [],
        find: [ROLE.ADMINISTRATOR, ROLE.GUEST]
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
