'use strict';
const { User } = require('../models');
const EmailService = require('../services/EmailService');
const redis = require('redis');
const client = redis.createClient({ host: global.config.connection.redis.host });

client.on('error', err => new Error(err));

module.exports = {
  async sendResetPasswordEmail ({ email }) {
    const user = await User.findOne({ email });
    if(!user) throw { status: 404, message: 'USER.NOT_FOUND_EMAIL' };

    return EmailService.resetPassword(email);
  },

  resetPassword ({ email, hash, password }) {
    return new Promise(function (resolve, reject) {
      User.findOne({ email })
        .then(user => {
          if(!user) throw { status: 404, message: 'USER.NOT_FOUND_EMAIL' };

          client.get('pass_' + email, (err, _hash) => {
            if(err) throw err;

            if(!hash) throw { status: 404, message: 'ERROR.PASSWORD_HASH_NOT_FOUND' };
            if(hash !== _hash) throw { status: 400, message: 'ERROR.PASSWORD_HASH_MISSMATCH' };

            User.createPasswordHash(password)
              .then(passwordHash => User.update({ _id: user._id }, { password: passwordHash }))
              .then(() => {
                client.del('pass_' + email);

                return resolve();
              })
              .catch(reject);
          });
        })
        .catch(reject);
    });
  },

  validatePasswordResetHash ({ email, hash }) {
    return new Promise(function (resolve, reject) {
      client.get('pass_' + email, (err, _hash) => {
        if(err) return reject(err);
        if(!_hash) return reject({ status : 404, message: 'ERROR.PASSWORD_HASH_NOT_FOUND' });
        if(hash !== _hash) return reject({ status: 400, message: 'ERROR.PASSWORD_HASH_MISSMATCH' });

        return resolve();
      });
    });
  },

  async updatePassword (id, { password, newPassword }) {
    const user = await User.findById(id);
    if (!user) throw { status : 404, message : 'USER.NOT_FOUND_ID' };

    await User.comparePassword(password, user);
    const newHash = await User.createPasswordHash(newPassword);

    return User.update({ _id: id }, { password: newHash });
  }
};
