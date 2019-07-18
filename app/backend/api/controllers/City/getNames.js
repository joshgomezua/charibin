'use strict';

const { CityService } = require('../../services');

module.exports = app => {
  app.get('/citynames', ({ token: { role } }, res) => {
    if(role !== global.config.custom.roles.ADMINISTRATOR) return res.error({ status: 403, message: 'ACCESS.DENIED' });

    CityService.getListOfCitiesNames()
      .then(res.ok)
      .catch(res.error);
  });
};