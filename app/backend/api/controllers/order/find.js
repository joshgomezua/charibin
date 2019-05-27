'use strict';

const { Valid, OrderService } = require('../../services');

module.exports = (app) => {
  app.get('/order/:page/:limit/:sortField?/:sortOrder?', ({ params, token }, res) => {
    if (token.role !== global.config.custom.roles.ADMINISTRATOR)
      return res.error({ status: 403, message: 'ACCESS.DENIED' });

    Valid.onCreate(params, 'OrderCriteria', global.config.custom.roles.CLIENT)
      .then(OrderService.find)
      .then(res.ok)
      .catch(res.error);
  });
};
