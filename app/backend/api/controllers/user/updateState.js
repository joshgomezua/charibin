'use strict';

const { Valid, Utilities, UserService } = require('../../services');

module.exports = (app) => {
  app.patch('/user/:id', ({ params: { id }, body, token: { role } }, res) => {
    if (role !== global.config.custom.roles.ADMINISTRATOR)
      return res.error({ status: 403, message: 'ACCESS.DENIED' });
    if (!Utilities.isMongoId(id)) return res.error({ status: 400, message: 'ERROR.NOT.MONGOID' });

    Valid.onUpdate(body, 'User', role)
      .then((data) => UserService.updateState(id, data))
      .then(res.ok)
      .catch(res.error);
  });
};