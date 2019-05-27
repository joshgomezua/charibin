'use strict';
module.exports = function (data) {
  const res = this;
  const responseData = data || 'Created';

  res.status(201);
  return res.jsonp(responseData);
};
