const Role = require('../../models/role.model');
const Permission = require('../../models/permission.model');

module.exports = {
  up: async (queryInterface) => {
    const rolePermisson = [];
    const roles = await Role.findAll({ attributes: { include: 'id' } });
    const permissions = await Permission.findAll({ attributes: { include: 'id' } });

    roles.forEach((role) => {
      permissions.forEach((permission) => {
        if (role.name === 'Admin') {
          rolePermisson.push({
            role_id: role.id,
            permission_id: permission.id,
          });
        }
        if (role.name === 'User' && permission.name !== 'user_management_access') {
          rolePermisson.push({
            role_id: role.id,
            permission_id: permission.id,
          });
        }
      });
    });

    return queryInterface.bulkInsert('role_permission', rolePermisson);
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete('role_permission', null, {});
  },
};
