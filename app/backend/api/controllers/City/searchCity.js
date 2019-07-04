'use strict';

const { CityService, Utilities } = require('../../services');

module.exports = app => {
  app.get('/city/:page/:limit/:name', ({ params: {page,limit,name }, token: { role } }, res) => {
    if(role !== global.config.custom.roles.ADMINISTRATOR) return res.error({ status: 403, message: 'ACCESS.DENIED' });
     if (!Utilities.isInt(page) || !Utilities.isPosInt(limit))
      return res.error({ status: 400, message: 'VALIDATION.PAGINATION.PARAMS' });
   
      CityService.findCity(name, +page, +limit)
      .then(res.ok)
      .catch(res.error);
  });
};