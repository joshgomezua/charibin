'use strict';

const { UserService, Utilities } = require('../../services');

module.exports = app => {
  app.delete('/user/:id', ({ params: { id }, token: { role } }, res) => {
    if(role !== global.config.custom.roles.ADMINISTRATOR) return res.error({ status: 403, message: 'ACCESS.DENIED' });
    if(!Utilities.isMongoId(id)) return res.error({ status: 400, message: 'ERROR.NOT.MONGOID' });

    UserService.destroy(id)
      .then(res.ok)
      .catch(res.error);
  });
};
