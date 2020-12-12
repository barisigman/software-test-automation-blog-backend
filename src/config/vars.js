const path = require('path');

// import .env variables
require('dotenv-safe').config({
  path: path.join(__dirname, '../../.env'),
  sample: path.join(__dirname, '../../.env.example'),
});

module.exports = {
  env: process.env.APP_ENV,
  host: process.env.APP_HOST,
  port: process.env.APP_PORT,
  secret: process.env.APP_SECRET,
  redisConf: {
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
  },
  postgres: {
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    db: process.env.POSTGRES_DB,
  },
  logs: process.env.APP_ENV === 'production' ? 'combined' : 'dev',
};
