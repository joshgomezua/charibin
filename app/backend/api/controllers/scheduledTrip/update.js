'use strict';

const { Valid, ScheduledTripService, Utilities } = require('../../services');

module.exports = app => {
  app.put('/scheduledTrip/:id', ({ body, params: { id }, token: { role } }, res) => {

    if(!Utilities.isMongoId(id)) return res.error({ status: 400, message: 'ERROR.NOT.MONGOID' });

    Valid.onUpdate(body, 'ScheduledTrip', role)
      .then(data => ScheduledTripService.update(id, data))
      .then(res.ok)
      .catch(res.error);
  });
};
