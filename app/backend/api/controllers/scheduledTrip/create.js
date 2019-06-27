'use strict';

const { Valid, ScheduledTripService } = require('../../services');

module.exports = app => {
  app.post('/scheduledTrip', ({ body, token: { role } }, res) =>
    Valid.onCreate(body, 'ScheduledTrip', role)
      .then(data => ScheduledTripService.create(data))
      .then(res.created)
      .catch(res.error)
  );
};
