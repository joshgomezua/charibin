'use strict';

const { User } = require('../../api/models');
const jwToken = require('../../api/services/jwToken');

module.exports = {
  async createUser (data) {
    return (await User.create(data)).toObject();
  },

  getToken ({ _id, role }) {
    return jwToken.issue({
      id: _id,
      role: role
    });
  },
};
