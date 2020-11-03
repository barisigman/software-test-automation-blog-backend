const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');
const Permission = require('./permission.model');

const Role = sequelize.define(
  'roles',
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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    charset: 'utf8',
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  }
);

Role.belongsToMany(Permission, {
  through: 'role_permission',
  as: 'permissions',
  foreignKey: {
    name: 'role_id',
  },
  timestamps: false,
});

Permission.belongsToMany(Role, {
  through: 'role_permission',
  as: 'roles',
  foreignKey: {
    name: 'permission_id',
  },
  timestamps: false,
});

module.exports = Role;
