'use strict';

const ROLE = global.config.custom.roles;

module.exports = {
  ordercriteria: {
    page: {
      type: 'number',
      required: true,
      permission: {
        create: [ROLE.ADMINISTRATOR, ROLE.CLIENT],
        update: [],
        find: []
      },
      min: 0,
      max: 1000,
    },

    limit: {
      type: 'number',
      required: true,
      permission: {
        create: [ROLE.ADMINISTRATOR, ROLE.CLIENT],
        update: [],
        find: []
      },
      min: 1,
      max: 1000,
    },

    sortField: {
      type: 'string',
      required: false,
      permission: {
        create: [ROLE.ADMINISTRATOR, ROLE.CLIENT],
        update: [],
        find: []
      },
      pattern: /^(buyer\.name|buyer\.email|buyer\.phone|buyer\.birthDate|buyer\.address|buyer\.city|buyer\.zipCode|stripeChargeId|selected|deselected|finalSelection|finalDestination|date\.arrival\.start|date\.arrival\.end|date\.departure\.start|date\.departure\.end|quantity|ticketPrice|arrivalTimePrice|departureTimePrice|deselectionPrice|totalPrice|sent|createdAt|_id|__v)$/i,
    },

    sortOrder: {
      type: 'string',
      required: false,
      permission: {
        create: [ROLE.ADMINISTRATOR, ROLE.CLIENT],
        update: [],
        find: []
      },
      pattern: /^(ascending|descending)$/i,
    },
  }
};
