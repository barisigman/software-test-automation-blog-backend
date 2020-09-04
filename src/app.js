const { port, env } = require('./config/vars');
const logger = require('./config/logger');
const app = require('./config/express');
const sequelize = require('./config/sequelize');

// testing the database connection
sequelize.connection();

// listen to requests
app.listen(port, () => logger.info(`server started on port ${port} (${env})`));
