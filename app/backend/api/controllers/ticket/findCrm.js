'use strict';

const { TicketService, Valid } = require('../../services');

module.exports = app => {
  app.get('/ticket/:dateStart/:dateEnd/:from/:to/:carrier/:page/:limit', ({ params, token: { role } }, res) => {
    Valid.onCreate(params, 'TicketGetCRM', role)
      .then((params) => TicketService.findCRM(params))
      .then(res.ok)
      .catch(res.error);
  });
};
