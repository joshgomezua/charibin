'use strict';

const { Valid, TicketService } = require('../../services');

module.exports = app => {
  app.post('/ticket/book', ({ body, token: { role } }, res) =>
    Valid.onCreate(body, 'TicketBooking', role)
      .then(data => TicketService.book(data))
      .then(res.created)
      .catch(res.error)
  );
};
