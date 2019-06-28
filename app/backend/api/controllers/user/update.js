
'use strict';

const { Valid, UserService, Utilities } = require('../../services');

module.exports = app => {
  app.put('/user/:id', ({ body, params: { id }, token: { role } }, res) => {

    if(!Utilities.isMongoId(id)) return res.error({ status: 400, message: 'ERROR.NOT.MONGOID' });

    Valid.onUpdate(body, 'User', role)
      .then(data => UserService.update(id, data))
      .then(res.ok)
      .catch(res.error);
  });
};