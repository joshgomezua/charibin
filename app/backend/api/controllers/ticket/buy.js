'use strict';

const { Valid, TicketService } = require('../../services');

module.exports = app => {
  app.post('/ticket/buy', ({ body, token: { role } }, res) =>
    Valid.onCreate(body, 'TicketBuy', role)
      .then(data => TicketService.buy(data))
      .then(res.ok)
      .catch(res.error)
  );
};
