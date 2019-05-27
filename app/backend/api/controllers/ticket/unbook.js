'use strict';

const { Valid, TicketService } = require('../../services');

module.exports = app => {
  app.post('/ticket/unbook', ({ body, token: { role } }, res) =>
    Valid.onCreate(body, 'TicketUnbooking', role)
      .then(data => TicketService.unbook(data))
      .then(res.ok)
      .catch(res.error)
  );
};
