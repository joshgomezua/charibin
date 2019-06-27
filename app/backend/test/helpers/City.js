'use strict';

const { City } = require('../../api/models');

module.exports = {
  async createCity (data) {
    try {
      const city = await City.create(data);
      return city.toObject();

    } catch (err) {
      data.name = `${data.name}_next`;
      const city = await this.createCity(data);
      return typeof city.toObject === 'function' ? city.toObject() : city;
    }
  }
};