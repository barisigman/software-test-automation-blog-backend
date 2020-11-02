const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

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
    defaultScope: {
      attributes: { exclude: ['id'] },
    },
    charset: 'utf8',
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  }
);

Role.associate = (models) => {
  Role.belongsToMany(models.User, {
    through: 'user_role',
    as: 'users',
    foreignKey: 'role_id',
  });
  Role.belongsToMany(models.Permission, {
    through: 'role_permission',
    as: 'permissions',
    foreignKey: 'role_id',
  });
};

module.exports = Role;
