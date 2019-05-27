'use strict';

module.exports = function () {
  const res = this;

  res.status(204);
  return res.jsonp('No content');
};
