'use strict';

const { CityService, Utilities } = require('../../services');

module.exports = app => {
  app.get('/city/:page/:limit/:sortField?/:sortOrder?', ({ params: { page,limit,sortField,sortOrder }, token: { role } }, res) => {
    if(role !== global.config.custom.roles.ADMINISTRATOR) return res.error({ status: 403, message: 'ACCESS.DENIED' });
    if (!Utilities.isInt(page) || !Utilities.isPosInt(limit))
      return res.error({ status: 400, message: 'VALIDATION.PAGINATION.PARAMS' });

      CityService.findCRM(+page, +limit, sortOrder, sortField)
      .then(res.ok)
      .catch(res.error);
  });
};