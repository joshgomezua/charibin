'use strict';

const { TripService, Utilities } = require('../../services');

module.exports = app => {
  app.get('/trip/:page/:limit', ({ params: { page, limit }, token: { role } }, res) => {
    if(role !== global.config.custom.roles.ADMINISTRATOR) return res.error({ status: 403, message: 'ACCESS.DENIED' });
    if (!Utilities.isInt(page) || !Utilities.isPosInt(limit))
      return res.error({ status: 400, message: 'VALIDATION.PAGINATION.PARAMS' });

    TripService.findCRM(+page, +limit)
      .then(res.ok)
      .catch(res.error);
  });
};
