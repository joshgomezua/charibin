'use strict';

const { Valid, Utilities, OrderService } = require('../../services');

module.exports = (app) => {
  app.patch('/order/:id', ({ params: { id }, body, token: { role } }, res) => {
    if (role !== global.config.custom.roles.ADMINISTRATOR)
      return res.error({ status: 403, message: 'ACCESS.DENIED' });
    if (!Utilities.isMongoId(id)) return res.error({ status: 400, message: 'ERROR.NOT.MONGOID' });

    Valid.onUpdate(body, 'Order', role)
      .then((data) => OrderService.updateOne(id, data))
      .then(res.ok)
      .catch(res.error);
  });
};
