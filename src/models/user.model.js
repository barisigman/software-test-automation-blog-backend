const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

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
  },
  {
    defaultScope: {
      attributes: { exclude: ['id', 'password'] },
    },
    charset: 'utf8',
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  }
);

User.associate = (models) => {
  User.belongsToMany(models.Role, {
    through: 'user_role',
    as: 'roles',
    foreignKey: 'user_id',
  });
};

User.beforeCreate(async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, 12);
  const toBeCreatedUser = user;
  toBeCreatedUser.password = hashedPassword;
});

User.verifyPassword = async function verifyHashedPassword(password) {
  const isVerified = await bcrypt.compare(password, this.password);
  return isVerified;
};

module.exports = User;
