'use strict';

const { TripService } = require('../../services');

module.exports = app => {
  app.get('/opposites/:id', ({ params: { id }, token: { role } }, res) => {
    if(role !== global.config.custom.roles.ADMINISTRATOR) return res.error({ status: 403, message: 'ACCESS.DENIED' });

    TripService.getOpposites(id)
      .then(res.ok)
      .catch(res.error);
  });
};
