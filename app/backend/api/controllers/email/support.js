'use strict';

const { Valid, EmailService } = require('../../services');

module.exports = app => {
  app.post('/support', (req, res) =>
    Valid.onCreate(req.body, 'Support', req.token.role)
      .then(data => EmailService.support(data))
      .then(res.ok)
      .catch(res.error)
  );
};
