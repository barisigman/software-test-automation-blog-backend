const Role = require('../models/role.model');

const RoleRepository = {
  async getRoles() {
    const roles = await Role.findAll();

    return roles;
  },
};

module.exports = RoleRepository;
