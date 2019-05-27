'use strict';

const ROLE = global.config.custom.roles;

module.exports = {
  support: {
    email: {
      type: 'email',
      required: true,
      permission: {
        create: [ROLE.ADMINISTRATOR, ROLE.GUEST],
        update: [],
        find: []
      },
      minLength: 5,
      maxLength: 40,
      pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,10}))$/
    },

    firstName: {
      type: 'string',
      required: true,
      permission: {
        create: [ROLE.ADMINISTRATOR, ROLE.GUEST],
        update: [],
        find: []
      },
      pattern: /^[\p{L}]{1,20}$/u
    },

    lastName: {
      type: 'string',
      required: true,
      permission: {
        create: [ROLE.ADMINISTRATOR, ROLE.GUEST],
        update: [],
        find: []
      },
      pattern: /^[\p{L}]{1,20}$/u
    },

    message: {
      type: 'string',
      required: true,
      permission: {
        create: [ROLE.ADMINISTRATOR, ROLE.GUEST],
        update: [],
        find: []
      },
      maxLength: 2000,
      minLength: 1
    },

    phone: {
      type: 'string',
      required: true,
      permission: {
        create: [ROLE.ADMINISTRATOR, ROLE.GUEST],
        update: [],
        find: []
      },
      pattern: /^\+[\d\- ]{6,18}$/
    },
  }
};
