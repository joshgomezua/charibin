'use strict';

module.exports = {
  set (client, key, value = '', expTime) {
    return new Promise((resolve, reject) => {
      if(!client instanceof Object) return reject({ status: 500, message: 'client must be Object type' });
      if(!key) return reject({ status: 500, message: 'key are required' });
      if(!expTime) return reject({ status: 500, message: 'expTime are required' });

      client.set(key, value, 'EX', expTime, err => {
        if (err) return reject({ status: 500, message: err });

        return resolve();
      });
    });
  },

  del (client, key) {
    return new Promise((resolve, reject) => {
      if(!client instanceof Object) return reject({ status: 500, message: 'client must be Object type' });
      if(!key) return reject({ status: 500, message: 'key are required' });

      client.del(key, err => {
        if (err) return reject({ status: 500, message: err });

        return resolve();
      });
    });
  },

  setOrIncrby (client, key, value = 1, expTime) {
    return new Promise((resolve, reject) => {
      if(!client instanceof Object) return reject({ status: 500, message: 'client must be Object type' });
      if(!key) return reject({ status: 500, message: 'key are required' });
      if(!expTime) return reject({ status: 500, message: 'expTime are required' });

      client.get(key, (err, data) => {
        if (err) return reject({ status: 500, message: err });

        if(data) {
          client.incrby(key, value, err => {
            if (err) return reject({ status: 500, message: err });
            return resolve();
          });
        } else {
          client.set(key, value, 'EX', expTime, err => {
            if (err) return reject({ status: 500, message: err });

            return resolve();
          });
        }
      });
    });
  }
};
