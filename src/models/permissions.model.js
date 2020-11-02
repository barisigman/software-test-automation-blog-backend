const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

const Permissions = sequelize.define(
  'permissions',
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

Permissions.associate = (models) => {
  Permissions.belongsToMany(models.Role, {
    through: 'role_permission',
    as: 'roles',
    foreignKey: 'permission_id',
  });
};

module.exports = Permissions;
