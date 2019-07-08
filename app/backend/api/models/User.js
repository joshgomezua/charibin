'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  email: { type: String, unique: true },
  name: String,
  role: { type: String, enum: ['Administrator', 'Modify', 'Read Only', 'Client'] },
  password: String,
  createdAt: { type: Date, default: Date.now },
  active: { type: Boolean, default: true },
  isDeleted:{ type: Boolean, default: false },
});

userSchema.pre('save', function (next) {
  const _this = this;
  bcrypt.hash(_this.password, 15, function (err, hash) {
    if (err) {
      global.log.error(err);
      return next(err);
    }

    _this.password = hash;
    return next();
  });
});

userSchema.statics.createPasswordHash = function (newPassword) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(newPassword, 15, function (err, hash) {
      if (err) return reject(err);
      return resolve(hash);
    });
  });
};

userSchema.statics.comparePassword = function (password, user) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, user.password, (err, match) => {
      if (err) return reject(err);
      if (match) return resolve(user);

      return reject({ status: 401, message : 'USER.PASSWORD.INVALID' });
    });
  });
};

module.exports = mongoose.model('User', userSchema);
