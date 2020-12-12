const redis = require('redis');
const logger = require('./logger');
const { redisConf } = require('./vars');

const redisClient = redis.createClient({
  host: 'redis',
  port: redisConf.port,
  password: redisConf.password,
});

const connection = () => {
  redisClient.on('connect', () => {
    logger.info('Redis connection has been established successfully.');
  });

  redisClient.on('error', (error) => {
    logger.error(`Unable to connect to the redis: ${error}`);
    redisClient.quit();
  });
};

module.exports = { redisClient, connection };
