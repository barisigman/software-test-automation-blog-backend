/** @typedef {import('sequelize/types')} DataTypes */

module.exports = {
  /**
   * @param {DataTypes} DataTypes
   */
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable(
      'user_role',
      {
        user_id: {
          type: DataTypes.INTEGER,
          references: {
            model: 'users',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          allowNull: false,
        },
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
      },
      {
        chatset: 'utf8',
        timestamps: false,
      }
    );
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('user_role');
  },
};
