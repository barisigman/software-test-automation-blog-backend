const { Sequelize } = require('sequelize');
const logger = require('./logger');
const { postgres } = require('./vars');

const UserModel = require('../models/user.model');

const sequelize = new Sequelize(postgres.db, postgres.user, postgres.password, {
  host: 'db',
  dialect: 'postgres',
});

const User = UserModel(sequelize, Sequelize);

const connection = () => {
  sequelize
    .authenticate()
    .then(() => {
      logger.info('Database connection has been established successfully.');

      sequelize.sync().then(() => {
        logger.info('Database & tables created!');
      });
    })
    .catch((error) => {
      logger.error(`Unable to connect to the database: ${error}`);
    });
};

module.exports = {
  connection,
  User,
};
