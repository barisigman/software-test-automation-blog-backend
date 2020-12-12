const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const faker = require('faker');

faker.locale = 'tr';

const users = [
  {
    id: 1,
    uuid: uuidv4(),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: 'admin@admin.com',
    password: bcrypt.hashSync('12345678', 12),
    created_at: faker.date.past(),
    updated_at: faker.date.recent(),
  },
  {
    id: 2,
    uuid: uuidv4(),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: 'user@user.com',
    password: bcrypt.hashSync('12345678', 12),
    created_at: faker.date.past(),
    updated_at: faker.date.recent(),
  },
];

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('users', users);
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
