/** @typedef {import('sequelize/types')} DataTypes */

module.exports = {
  /**
   * @param {DataTypes} DataTypes
   */
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable(
      'role_permission',
      {
        role_id: {
          type: DataTypes.INTEGER,
          references: {
            model: 'roles',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          allowNull: false,
        },
        permission_id: {
          type: DataTypes.INTEGER,
          references: {
            model: 'permissions',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          allowNull: false,
        },
      },
      {
        chatset: 'utf8',
        timestamps: false,
      }
    );
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('role_permission');
  },
};
