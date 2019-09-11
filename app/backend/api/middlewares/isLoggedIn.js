'use strict';

const jwToken = require('../services/jwToken.js');
module.exports = (req, res, next) => {
  let token;

  if (req.headers && req.headers.token) {
    token = req.headers.token;

    if (token.length <= 0) return res.error({ status: 400, message: 'ERROR.INVALID_TOKEN' });
  } else if (req.params.token) {
    token = req.params.token;

    delete req.query.token; // We delete the token from param to not mess with blueprints
  } else {
    req.token = { id: null, role: 'Guest' };
    return next();
  }
  let url = req.url.split('/')
  let index = url.findIndex(k => k == "tripDeparturenames")
  jwToken.verify(token, function (err, token) {
    if (req.headers && req.headers.token != "false" && index == -1) {
      if (err) return res.error({ status: 400, message: 'ERROR.INVALID_TOKEN' });
      req.token = token; // This is the decrypted token or the payload you provided
      next();
    }
    else {
      req.token = { id: null, role: 'Guest' };
      next();
    }
  });
};
