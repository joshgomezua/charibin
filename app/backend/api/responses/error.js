'use strict';


const preRun = require('../helpers/preRun');
const language = process.env.NODE_ENV === 'production' ? 'se' : 'en';
const dictionary = preRun.loadErrorMessages(`../config/error_messages/${language}.json`);

function interpolate (template, args) {
  let i = 0;
  return template.replace(/%s/g, () => args[i++]);
}

function stripeError ({ status, type, code, rawMessage }) {
  return {
    status,
    message : (dictionary[status][type] + dictionary[status][code]) || rawMessage,
  };
}

function translate (err) {
  if (err.status === 'stripe')
    return stripeError({
      status : 'stripe',
      type : err.rawType || err.message.rawType,
      code : err.code || err.message.code,
      rawMessage: err.message.message,
    });

  if (err.message && !err.message.length) return { status: err.status, message : '' };

  let path;
  try {
    path = err.message.split('.');
  } catch (error) {
    global.log.error(err);
    return {
      status : err.status,
      message : err.message
    };
  }

  let _message = dictionary[err.status];
  let i = 0;
  while (i < path.length) {
    _message = _message[path[i]] || '';
    i++;
  }

  return {
    status : err.status,
    message : err.message.includes('%') ? interpolate(_message, err.args) : _message
  };
}

module.exports = function (err) {
  const res = this;
  if(!err) err = { status: 500 };
  switch (err.status) {
    case 'stripe':
      /* @see https://stripe.com/docs/api/node#errors */
      if (err.message.type === 'StripeCardError') {
        res.status(400);
        return res.jsonp({ status: 400, message: err.message.message });
      } else {
        res.status(500);
        global.log.error(err);
        return res.jsonp({ errCode: 500, message: 'Server Error' });
      }
    case 400:
      res.status(400);
      return res.jsonp(translate(err));
    case 401:
      res.status(401);
      return res.jsonp(translate(err));
    case 402:
      res.status(402);
      return res.jsonp(translate(err));
    case 403:
      res.status(403);
      return res.jsonp(translate(err));
    case 404:
      res.status(404);
      return res.jsonp(translate(err));
    case 409:
      res.status(409);
      return res.jsonp(translate(err));
    default:
      res.status(500);
      global.log.error(err);
      return res.jsonp({ errCode: 500, message: 'Server Error' });
  }
};
