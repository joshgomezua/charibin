'use strict';

const ROLE = global.config.custom.roles;

module.exports = {
  ticketbuy: {
    owner: {
      type: 'string',
      required: true,
      permission: {
        create: [ROLE.ADMINISTRATOR, ROLE.GUEST],
        update: [],
        find: []
      },
      maxLength: 100
    },

    creditCardToken: {
      type: 'string',
      required: true,
      permission: {
        create: [ROLE.ADMINISTRATOR, ROLE.GUEST],
        update: [],
        find: []
      },
      maxLength: 100
      // pattern: /^tok_[a-z0-9]{1,50}$/gi
    },

    buyerInfo: {
      type: 'object',
      required: true,
      permission: {
        create: [ROLE.ADMINISTRATOR, ROLE.GUEST],
        update: [],
        find: []
      },

      attributes: {
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

        middleName: {
          type: 'string',
          required: false,
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

        birthDate: {
          type: 'timestamp',
          required: true,
          permission: {
            create: [ROLE.ADMINISTRATOR, ROLE.GUEST],
            update: [],
            find: [],
          }
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

        address: {
          type: 'string',
          required: true,
          permission: {
            create: [ROLE.ADMINISTRATOR, ROLE.GUEST],
            update: [],
            find: []
          },
          pattern: /^[\p{L}\d.\/ ]{1,50}$/u
        },

        city: {
          type: 'string',
          required: true,
          permission: {
            create: [ROLE.ADMINISTRATOR, ROLE.GUEST],
            update: [],
            find: []
          },
          pattern: /^[\p{L} ]{1,20}$/u
        },

        zipCode: {
          type: 'string',
          required: true,
          permission: {
            create: [ROLE.ADMINISTRATOR, ROLE.GUEST],
            update: [],
            find: []
          },
          pattern: /^[\d-a-z]{2,14}$/i
        },
      }
    },
  }
};
