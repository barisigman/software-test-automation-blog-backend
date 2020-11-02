const { v4: uuidv4 } = require('uuid');
const faker = require('faker');

const roles = [
  {
    id: 1,
    uuid: uuidv4(),
    name: 'Admin',
    created_at: faker.date.past(),
    updated_at: faker.date.recent(),
  },
  {
    id: 2,
    uuid: uuidv4(),
    name: 'User',
    created_at: faker.date.past(),
    updated_at: faker.date.recent(),
  },
];

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('roles', roles);
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete('roles', null, {});
  },
};
