'use strict';

const mongoose = require('mongoose');
const S3 = require('aws-sdk/clients/s3');

const Utils = {
  upload (data, fileExtnesion) {
    return new Promise((resolve, reject) => {
      if(!data.includes('base64')) return resolve(data);
      if(process.env.MODE === 'seed' || process.env.MODE === 'test') return resolve(data);
      const bucket = new S3({ apiVersion: '2006-03-01' });
      const key = `${global.config.custom.app.env}_${mongoose.Types.ObjectId()}.${fileExtnesion}`;

      bucket.putObject({
        Bucket: global.config.connection.aws.s3.bucketName,
        Key: key,
        Body: new Buffer(data.split(';base64,').pop(), 'base64'),
        ContentType: data.substring('data:'.length, data.indexOf(';base64'))
      })
        .promise()
        .then(() => resolve(`${global.config.connection.aws.s3.host}/${global.config.connection.aws.s3.bucketName}/${key}`))
        .catch(err => reject({ status: 400, message: err }));
    });
  },

  isMongoId (id) {
    return new RegExp(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/).test(id);
  },

  isInt (val) {
    const parsed = parseInt(val);
    return parsed === parsed && /^\d+$/.test(val);
  },
  isPosInt (val) {
    return this.isInt(val) && +val > 0;
  },

  isDate (val) {
    return this.isPosInt(val) && new Date(+val).getTime() > 0;
  },

  toMongoId (id) {
    return mongoose.Types.ObjectId(id);
  },

  forceToHttp (url) {
    return /^(http:\/\/|https:\/\/)/.test(url) ? url : `http://${url}`;
  },
};

module.exports = Utils;
