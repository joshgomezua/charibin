'use strict';

const { TicketService, Utilities } = require('../../services');

module.exports = app => {
  app.get('/ticket/:page/:limit/:date', ({ params: { page,limit,date }}, res) => {
    TicketService.getTickets(+page,+limit,+date)
      .then(res.ok)
      .catch(res.error);
  });
};