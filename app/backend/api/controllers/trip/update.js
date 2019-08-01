'use strict';

const { Valid, TripService, Utilities } = require('../../services');

module.exports = app => {
  app.put('/trip/:id', ({ body, params: { id }, token: { role } }, res) => {
    if(!Utilities.isMongoId(id)) return res.error({ status: 400, message: 'ERROR.NOT.MONGOID' });

    Valid.onUpdate(body, 'Trip', role)
      .then(data => TripService.update(id, data))
      .then(res.ok)
      .catch(res.error);
  });
};
