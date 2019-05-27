'use strict';
module.exports = function (data) {
  const res = this;
  const responseData = data || '';

  res.status(200);
  return res.jsonp(responseData);
};
