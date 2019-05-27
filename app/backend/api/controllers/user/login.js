'use strict';

const { Valid, UserService } = require('../../services');

module.exports = app => {
  app.post('/login', (req, res) =>
    Valid.onCreate(req.body, 'Login', req.token.role)
      .then(data => UserService.login(data))
      .then(token => res.created(token))
      .catch(res.error)
  );
};
