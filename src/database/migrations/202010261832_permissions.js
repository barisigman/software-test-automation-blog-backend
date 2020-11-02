/** @typedef {import('sequelize/types')} DataTypes */

module.exports = {
  /**
   * @param {DataTypes} DataTypes
   */
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable(
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
        chatset: 'utf8',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
      }
    );
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('permissions');
  },
};
