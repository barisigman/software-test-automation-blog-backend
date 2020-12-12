const { validationResult } = require('express-validator');
const userRepository = require('../repositories/user.repository');
const roleRepository = require('../repositories/role.repository');

const index = async (req, res) => {
  const users = await userRepository.getUsersWithRolesAndPermissions();

  res.render('users', { title: 'Users', users });
};

const thrash = async (req, res) => {
  const users = await userRepository.getThrashedUsers();

  res.render('users/thrash', { title: 'Thrashed Users', users });
};

const show = async (req, res) => {
  const { uuid } = req.params;

  const user = await userRepository.getByUUID(uuid);

  res.render('users/show', { title: `${user.first_name} ${user.last_name} Details`, user });
};

const create = async (req, res) => {
  const roles = await roleRepository.getRoles();
  res.render('users/create', { title: 'Create User', roles });
};

const store = async (req, res) => {
  const errorFormatter = ({ msg }) => {
    return `${msg}`;
  };
  const errors = validationResult(req).formatWith(errorFormatter);
  const { firstName, lastName, email, password, roleName } = req.body;

  if (!errors.isEmpty()) {
    req.flash('danger', 'Please enter correct values!');
    req.flash('errors', errors.mapped());
    req.flash('old', { firstName, lastName, email });
    return res.redirect('/users/create');
  }

  const user = await userRepository.store(firstName, lastName, email, password, roleName);

  req.flash('info', 'User created successfully!');
  res.redirect(`/users/${user.uuid}`);
};

const edit = async (req, res) => {
  const { uuid } = req.params;

  const user = await userRepository.getByUUID(uuid);
  const roles = await roleRepository.getRoles();

  res.render('users/edit', { title: `Edit ${user.first_name} ${user.last_name}`, user, roles });
};

const update = async (req, res) => {
  const errorFormatter = ({ msg }) => {
    return `${msg}`;
  };
  const errors = validationResult(req).formatWith(errorFormatter);
  const { uuid } = req.params;
  const { firstName, lastName, email } = req.body;

  if (!errors.isEmpty()) {
    req.flash('danger', 'Please enter correct values!');
    req.flash('errors', errors.mapped());
    req.flash('old', { firstName, lastName, email });
    return res.redirect(`/users/edit/${uuid}`);
  }

  await userRepository.update(uuid, firstName, lastName, email);

  req.flash('info', 'User edited successfully!');
  res.redirect(`/users/${uuid}`);
};

const destroy = async (req, res) => {
  const { uuid } = req.params;

  await userRepository.destroy(uuid, false);

  req.flash('info', 'User thrashed successfully!');
  res.redirect(`/users`);
};

const forceDelete = async (req, res) => {
  const { uuid } = req.params;

  await userRepository.destroy(uuid, true);

  req.flash('info', 'User deleted successfully!');
  res.redirect(`/users/thrash`);
};

const restore = async (req, res) => {
  const { uuid } = req.params;

  await userRepository.restore(uuid);

  req.flash('info', 'User restored successfully!');
  res.redirect(`/users`);
};

module.exports = {
  index,
  thrash,
  create,
  store,
  show,
  edit,
  update,
  destroy,
  forceDelete,
  restore,
};
