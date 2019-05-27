'use strict';

module.exports.connection = {
  database: {
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
  },

  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  },

  mailgun: {
    domain: process.env.MAIL_DOMAIN,
    key: process.env.MAIL_KEY,
  },

  mailDevelopment: {
    from: process.env.MAIL_FROM,
    host: process.env.MAIL_SMTP_HOST,
    port: process.env.MAIL_SMTP_PORT,
    secure: false,
    ignoreTLS: true,
    tls: {
      rejectUnauthorized: false
    }
  },

  aws: {
    s3: {
      bucketName: process.env.AWS_S3_BUCKET_NAME,
      host: process.env.AWS_S3_HOST
    }
  },

  stripe: {
    apiKey: process.env.STRIPE_API_KEY,
    apiVer: process.env.STRIPE_API_VER
  }
};
