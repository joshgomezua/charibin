'use strict';

const ROLE = global.config.custom.roles;

module.exports = {
  user: {
    _id: {
      type: 'string',
      required: false,
      permission: {
        create: [],
        update: [],
        find: [ROLE.ADMINISTRATOR],
        destroy: [],
      },
    },

    __v: {
      type: 'number',
      required: false,
      permission: {
        create: [],
        update: [],
        find: [ROLE.ADMINISTRATOR],
        destroy: [],
      },
    },

    email: {
      type: 'email',
      required: true,
      permission: {
        create: [ROLE.ADMINISTRATOR],
        update: [ROLE.ADMINISTRATOR],
        find: [ROLE.ADMINISTRATOR],
        destroy: [ROLE.ADMINISTRATOR],
      },
      minLength: 5,
      maxLength: 40,
      pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,10}))$/
    },

    role: {
      type: 'string',
      required: true,
      permission: {
        create: [ROLE.ADMINISTRATOR],
        update: [ROLE.ADMINISTRATOR],
        find: [ROLE.ADMINISTRATOR],
        destroy: [ROLE.ADMINISTRATOR],
      },
      //pattern: /^(Administrator)$/
    },

    active: {
      type: 'boolean',
      required: true,
      permission: {
        create: [ROLE.ADMINISTRATOR],
        update: [ROLE.ADMINISTRATOR],
        find: [ROLE.ADMINISTRATOR]
      }
    

      //pattern: /^(Administrator)$/
    },
    isDeleted: {
      type: 'boolean',
      required: true,
      permission: {
        create: [ROLE.ADMINISTRATOR],
        update: [ROLE.ADMINISTRATOR],
        find: [ROLE.ADMINISTRATOR]
      }
    

      //pattern: /^(Administrator)$/
    },
    password: {
      type: 'password',
      required: false,
      permission: {
        create: [],
        update: [],
        find: [],
        destroy: [],
      },
      pattern: /^(?=.*[A-Z])[\w~@#$%^&*+=`|{}:;!.?\"()\[\]-](?=.*[0-9])(?=.*[a-z]).{7,}$/
    },

    createdAt: {
      type: 'timestamp',
      required: false,
      permission: {
        create: [],
        update: [],
        find: [ROLE.ADMINISTRATOR],
        destroy: []
      }
    }
  }
};
