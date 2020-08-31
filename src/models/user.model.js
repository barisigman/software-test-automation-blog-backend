module.exports = (sequelize, type) => {
  return sequelize.define(
    'user',
    {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      uuid: {
        type: type.UUID,
        defaultValue: type.UUIDV4,
        allowNull: false,
        unique: true,
      },
      first_name: {
        type: type.STRING,
        allowNull: false,
      },
      last_name: {
        type: type.STRING,
        allowNull: false,
      },
      email: {
        type: type.STRING,
        allowNull: false,
        unique: true,
      },
      created_at: {
        type: type.DATE,
        defaultValue: type.NOW,
      },
      updated_at: {
        type: type.DATE,
        defaultValue: type.NOW,
      },
      deleted_at: {
        type: type.DATE,
        defaultValue: null,
        allowNull: true,
      },
    },
    {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );
};
