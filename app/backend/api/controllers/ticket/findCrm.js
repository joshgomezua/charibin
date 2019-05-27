'use strict';

const { TicketService, Valid } = require('../../services');

module.exports = app => {
  app.get('/ticket/:dateStart/:dateEnd', ({ params: { dateStart, dateEnd }, token: { role } }, res) => {
    Valid.onCreate({ dateStart, dateEnd }, 'TicketGetCRM', role)
      .then(({ dateStart, dateEnd }) => TicketService.findCRM(+dateStart, +dateEnd))
      .then(res.ok)
      .catch(res.error);
  });
};
