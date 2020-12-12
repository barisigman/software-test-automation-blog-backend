const { Op } = require('sequelize');
const User = require('../models/user.model');
const Role = require('../models/role.model');

const UserRepository = {
  async getUsersWithRolesAndPermissions() {
    const users = await User.findAll({
      include: [
        {
          model: Role,
          as: 'roles',
          include: 'permissions',
        },
      ],
    });

    return users;
  },
  async getThrashedUsers() {
    const users = await User.findAll({
      include: [
        {
          model: Role,
          as: 'roles',
          include: 'permissions',
        },
      ],
      where: { deleted_at: { [Op.not]: null } },
      paranoid: false,
    });

    return users;
  },
  async getByUUID(uuid) {
    const user = await User.findOne({
      where: { uuid },
      include: [
        {
          model: Role,
          as: 'roles',
          include: 'permissions',
        },
      ],
    });

    return user.get();
  },
  async store(firstName, lastName, email, password, roleName) {
    const userDetails = {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
    };

    const user = await User.create(userDetails);
    const role = await Role.findOne({ where: { name: roleName } });
    user.addRoles(role);

    return user;
  },
  async update(uuid, firstName, lastName, email) {
    const user = await User.update(
      { first_name: firstName, last_name: lastName, email },
      {
        where: { uuid },
        individualHooks: true,
      }
    );

    return user;
  },
  async destroy(uuid, force) {
    await User.destroy({
      where: {
        uuid,
      },
      force,
    });

    return true;
  },
  async restore(uuid) {
    await User.restore({
      where: { uuid },
    });

    return true;
  },
};

module.exports = UserRepository;
