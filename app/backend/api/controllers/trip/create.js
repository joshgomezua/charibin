'use strict';

const { Valid, TripService } = require('../../services');

module.exports = app => {
  app.post('/trip', ({ body, token: { role } }, res) => { 
    Valid.onCreate(body, 'Trip', role)
      .then(data => TripService.create(data))
      .then(res.created)
      .catch(res.error)
  });
};
