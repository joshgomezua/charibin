'use strict';

const { Valid, CityService } = require('../../services');

module.exports = app => {
  app.post('/city', ({ body, token: { role } }, res) =>
    Valid.onCreate(body, 'City', role)
      .then(data => CityService.create(data))
      .then(res.created)
      .catch(res.error)
  );
};