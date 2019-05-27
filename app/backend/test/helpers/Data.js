'use strict';

module.exports = {
  dataClone (template, len = 1) {
    const data = new Array(len);
    for (let i = 0; i < len; i++) {
      data[i] = this.createData(template);
    }
    return data.length === 1 ? data[0] : data;
  },

  createData (template) {
    const data = {};
    for (let prop in template) {
      if (template[prop] && typeof template[prop] === 'object') {
        data[prop] = this.createData(template[prop]);
        continue;
      }

      if(typeof template[prop] === 'function')
        data[prop] = template[prop]();
      else {
        data[prop] = template[prop];
      }
    }
    return data;
  },
};
