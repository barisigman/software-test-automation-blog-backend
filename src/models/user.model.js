const { DataTypes } = require('sequelize');
const { startCase } = require('lodash');
const bcrypt = require('bcryptjs');
const Role = require('./role.model');

const { sequelize } = require('../config/sequelize');

const User = sequelize.define(
  'users',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue('first_name', startCase(value));
      },
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue('last_name', startCase(value));
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    defaultScope: {
      attributes: { exclude: ['password'] },
    },
    charset: 'utf8',
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  }
);

User.belongsToMany(Role, {
  through: 'user_role',
  as: 'roles',
  foreignKey: {
    name: 'user_id',
  },
  timestamps: false,
});

Role.belongsToMany(User, {
  through: 'user_role',
  as: 'users',
  foreignKey: {
    name: 'role_id',
  },
  timestamps: false,
});

User.beforeCreate(async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, 12);
  const toBeCreatedUser = user;
  toBeCreatedUser.password = hashedPassword;
});

User.beforeUpdate(async (user) => {
  if (user.password) {
    const hashedPassword = await bcrypt.hash(user.password, 12);
    const toBeCreatedUser = user;
    toBeCreatedUser.password = hashedPassword;
  }
});

User.verifyPassword = async function verifyHashedPassword(password) {
  const isVerified = await bcrypt.compare(password, this.password);
  return isVerified;
};

module.exports = User;
