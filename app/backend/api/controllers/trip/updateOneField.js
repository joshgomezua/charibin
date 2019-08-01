'use strict';

const { Valid, TripService, Utilities } = require('../../services');

module.exports = app => {
  app.put('/trip/:id/:field', ({ body, params: { id, field }, token: { role } }, res) => {

    if(!Utilities.isMongoId(id)) return res.error({ status: 400, message: 'ERROR.NOT.MONGOID' });
    console.log(body)
    Valid.onUpdate(body, 'Trip', role)
      .then(data => TripService.updateOneField(id, data, field))
      .then(res.ok)
      .catch(res.error);
  });
};
