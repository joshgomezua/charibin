'use strict';

const { TripService } = require('../../services');

module.exports = app => {
  app.get('/tripnames', ({ token: { role } }, res) => {
    if(role !== global.config.custom.roles.ADMINISTRATOR) return res.error({ status: 403, message: 'ACCESS.DENIED' });

    TripService.getListOfTripsNames()
      .then(res.ok)
      .catch(res.error);
  });
};
