const { Sequelize } = require('sequelize');
const logger = require('./logger');
const { postgres } = require('./vars');

const sequelize = new Sequelize(postgres.db, postgres.user, postgres.password, {
  host: 'db',
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    charset: 'utf8',
  },
});

const connection = () => {
  sequelize
    .authenticate()
    .then(() => {
      logger.info('Database connection has been established successfully.');
    })
    .catch((error) => {
      logger.error(`Unable to connect to the database: ${error}`);
    });
};

module.exports = { sequelize, connection };
