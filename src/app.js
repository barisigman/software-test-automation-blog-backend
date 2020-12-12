const { host, port, env } = require('./config/vars');
const redis = require('./config/redis');
const sequelize = require('./config/sequelize');
const logger = require('./config/logger');
const app = require('./config/express');

// testing the redis connection
redis.connection();

// testing the database connection
sequelize.connection();

// listen to requests
app.listen(port, () => logger.info(`server started on port ${host}:${port} (${env})`));
