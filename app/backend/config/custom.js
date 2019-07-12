'use strict';

module.exports.custom = {
  app: {
    env: process.env.NODE_ENV || 'development'
  },
  mail: {
    from: process.env.MAIL_FROM,
    rootURL: process.env.MAIL_ROOT_URL,
    activate (hash) {
      return `${this.rootURL}activate/${hash}`;
    },
    password (hash) {
      return `${this.rootURL}password/${hash}`;
    },
  },

  jwtSecret: process.env.JWT_SECRET,

  time: {
    day: 24 * 60 * 60 * 1000,
    day7: 7 * 24 * 60 * 60 * 1000,
  },

  roles: {
    ADMINISTRATOR: 'Administrator',
    CLIENT: 'Client',
    GUEST: 'Guest'
  },

  supportEmail: process.env.SUPPORT_EMAIL,

  ticket: {
    type: ['Train', 'Bus'],
    bookingTime: (process.env.TICKET_BOOKING_TIME || 15) * 60, // it must be in UNIX timestamp
    chooseTimePrice: +process.env.TICKET_CHOOSE_TIME_PRICE || 1, // it must be in £
  },

  TodayWithTimezone: 0
};
