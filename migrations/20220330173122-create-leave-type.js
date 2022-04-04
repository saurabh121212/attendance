'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('leave_types', {
      leave_type_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      leave_name: {
        type: Sequelize.STRING(200)
      },
      total_number_of_days: {
        type: Sequelize.INTEGER
      },
      eligible_for: {
        type: Sequelize.STRING(200)
      },
      del_status: {
        type: Sequelize.INTEGER
      },
      year: {
        type: Sequelize.STRING(20)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('leave_types');
  }
};