'use strict';

const { Valid, TicketService, Utilities } = require('../../services');

module.exports = app => {
  app.put('/ticket/:id', ({ body, params: { id }, token: { role } }, res) => {

    if(!Utilities.isMongoId(id)) return res.error({ status: 400, message: 'ERROR.NOT.MONGOID' });

    Valid.onUpdate(body, 'Ticket', role)
      .then(data => TicketService.update(id, data))
      .then(res.ok)
      .catch(res.error);
  });
};
