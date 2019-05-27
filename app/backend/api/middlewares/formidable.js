'use strict';

const formidable = require('formidable');

module.exports = (req, res, next) => {
  if((req.method === 'POST' || req.method === 'PUT' ) && req.headers['content-type'] !== 'application/json')
    return next(res.error({ status: 400 , message: 'ERROR.HEADERS_EXPECT_JSON_TYPE' }));

  const form = new formidable.IncomingForm();
  form.parse(req, (err, body, files) => {
    if (err) {
      global.log.error(err);
      return next(res.error({ status: 400 , message: 'VALIDATION.JSON_INVALID' }));
    }

    Object.assign(req, { body, files });
    return next();
  });
};
