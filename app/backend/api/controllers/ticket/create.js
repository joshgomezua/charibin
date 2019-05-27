'use strict';

const { Valid, TicketService } = require('../../services');

module.exports = app => {
  app.post('/ticket', ({ body, token: { role } }, res) =>
    Valid.onCreate(body, 'Ticket', role)
      .then(data => TicketService.create(data))
      .then(res.created)
      .catch(res.error)
  );
};
