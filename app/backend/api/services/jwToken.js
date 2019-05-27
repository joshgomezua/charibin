'use strict';
const jwt = require('jsonwebtoken');

module.exports = {
  // Generates a token from supplied payload
  issue (payload, noExp) {
    if(noExp) return jwt.sign(payload, global.config.custom.jwtSecret);

    return jwt.sign(
      payload,
      global.config.custom.jwtSecret, // Token Secret that we sign it with
      {
        expiresIn: '30 days' // Token Expire time
      });
  },

  // Verifies token on a request
  verify (token, next) {
    if(token.toString().length > 400) return next({ status: 400, message: `Token is too big. Length: ${token.length}` });
    return jwt.verify(
      token, // The token to be verified
      global.config.custom.jwtSecret, // Same token we used to sign
      {
        algorithms: ['HS256']
      }, // No Option, for more see https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback
      next //Pass errors or decoded token to callback
    );
  }
};
