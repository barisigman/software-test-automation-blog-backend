const { v4: uuidv4 } = require('uuid');
const faker = require('faker');

faker.locale = 'tr';

const createUser = () => {
  return {
    uuid: uuidv4(),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    created_at: faker.date.past(),
    updated_at: faker.date.recent(),
  };
};

const createUsers = (numUsers) => {
  return new Array(numUsers).fill(undefined).map(createUser);
};

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('users', createUsers(50));
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
