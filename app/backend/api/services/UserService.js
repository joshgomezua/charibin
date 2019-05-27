'use strict';

const Models = require('../models');
const { User } = Models;
const jwToken = require('../services/jwToken');

module.exports = {
  async login ({ email, password }) {
    const user = await User.findOne({ email });
    if (!user) throw { status: 404, message : 'USER.EMAIL.NOT_FOUND' };

    await User.comparePassword(password, user);

    return {
      token: jwToken.issue({
        id: user._id,
        role: user.role
      }),
      user: user
    };
  }
};
