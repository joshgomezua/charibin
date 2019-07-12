'use strict';

const {TicketService } = require('../../services');

module.exports = app => {
  app.get('/ticketQuantity', ({token: { role } }, res) =>{
    if(role !== global.config.custom.roles.ADMINISTRATOR) return res.error({ status: 403, message: 'ACCESS.DENIED' });
      TicketService.getQuantity()
      .then(res.ok)
      .catch(res.error)
    }
  );
};
