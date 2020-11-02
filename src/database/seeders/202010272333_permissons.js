const { v4: uuidv4 } = require('uuid');
const faker = require('faker');
const fg = require('fast-glob');

const modelFiles = fg.sync('*/models/*.js', {
  ignore: ['*/models/user.model.js'],
});

const permissionsTitle = ['_create', '_edit', '_show', '_delete', '_access'];
let permissionId = 2;
const permissions = [
  {
    id: 1,
    uuid: uuidv4(),
    name: 'user_management_access',
    created_at: faker.date.past(),
    updated_at: faker.date.recent(),
  },
];

permissionsTitle.forEach((title) => {
  modelFiles.forEach((file) => {
    const permissionName = file.match('src/models/(.*).model.js')[1];
    permissions.push({
      id: permissionId,
      uuid: uuidv4(),
      name: `${permissionName}${title}`,
      created_at: faker.date.past(),
      updated_at: faker.date.recent(),
    });
    permissionId += 1;
  });
});

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('permissions', permissions);
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete('permissions', null, {});
  },
};
