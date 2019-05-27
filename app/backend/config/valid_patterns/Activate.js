'use strict';

const ROLE = global.config.custom.roles;

module.exports = {
  activate: {
    email: {
      type: 'email',
      required: true,
      permission: {
        create: [ROLE.GUEST],
        update: [],
        find: [],
        destroy: [],
      },
      minLength: 5,
      maxLength: 40,
      pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,10}))$/
    },
    hash: {
      type: 'string',
      required: true,
      permission: {
        create: [ROLE.GUEST],
        update: [],
        find: [],
        destroy: [],
      },
      maxLength: 60,
    }
  }
};
