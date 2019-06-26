'use strict';

const { Valid, UserService } = require('../../services');

module.exports = app => {
  app.post('/user', ({ body, token: { role } }, res) =>
    Valid.onCreate(body, 'User', role)
      .then(data => UserService.create(data))
      .then(res.created)
      .catch(res.error)
  );
};
