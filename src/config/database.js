const { postgres } = require('./vars');

module.exports = {
  development: {
    username: postgres.user,
    password: postgres.password,
    database: postgres.db,
    host: 'db',
    port: postgres.port,
    dialect: 'postgres',
  },
  production: {
    username: postgres.user,
    password: postgres.password,
    database: postgres.db,
    host: 'db',
    port: postgres.port,
    dialect: 'postgres',
  },
};
