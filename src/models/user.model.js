const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

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
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
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
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    deleted_at: {
      type: DataTypes.DATE,
      defaultValue: null,
      allowNull: true,
    },
  },
  {
    defaultScope: {
      attributes: { exclude: ['id', 'password'] },
    },
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  }
);

User.generateHashedPassword = async function generateHashedPassword(password) {
  const hashedPassword = await bcrypt.hash(password, 12);
  return hashedPassword;
};

User.compareHashedPassword = async function compareHashedPassword(password) {
  const isVerified = await bcrypt.compare(password, this.password);
  return isVerified;
};

module.exports = { User };
