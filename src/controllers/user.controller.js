const { User } = require('../config/sequelize');

const index = async (req, res) => {
  const users = await User.findAll();

  res.render('user', { title: 'User Page', users });
};

const create = async (req, res) => {
  const user = await User.create({ first_name: 'Sam', last_name: 'Axel', email: 'sam@axel.com' });

  res.render('user', { title: 'User Page', user });
};

module.exports = {
  index,
  create,
};
