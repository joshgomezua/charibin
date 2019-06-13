'use strict';

const ROLE = global.config.custom.roles;

module.exports = {
  city: {
    _id: {
      type: 'string',
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

    country: {
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


    isModifiable: {
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

    tags: {
      type: 'array',
      required: false,
      permission: {
        create: [],
        update: [],
        find: [ROLE.ADMINISTRATOR, ROLE.GUEST]
      }
    },
  }
};
