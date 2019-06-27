'use strict';

const { Valid, CityService, Utilities } = require('../../services');

module.exports = app => {
  app.put('/city/:id', ({ body, params: { id }, token: { role } }, res) => {

    if(!Utilities.isMongoId(id)) return res.error({ status: 400, message: 'ERROR.NOT.MONGOID' });

    Valid.onUpdate(body, 'City', role)
      .then(data => CityService.update(id, data))
      .then(res.ok)
      .catch(res.error);
  });
};