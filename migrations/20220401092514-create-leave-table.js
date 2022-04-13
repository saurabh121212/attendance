'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('leave_tables', {
      leave_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      leave_name: {
        type: Sequelize.STRING(200)
      },
      leave_type: {
        type: Sequelize.STRING(200)
      },
      number_of_days: {
        type: Sequelize.INTEGER
      },
      start_date: {
        type: Sequelize.STRING(100)
      },
      end_date: {
        type: Sequelize.STRING(100)
      },
      leave_apply_by_id: {
        type: Sequelize.INTEGER
      },
      leave_apply_by_name: {
        type: Sequelize.STRING(200)
      },
      leave_apply_by_comments: {
        type: Sequelize.STRING(500)
      },
      assigned_to_id: {
        type: Sequelize.INTEGER
      },
      assigned_to_name: {
        type: Sequelize.STRING(200)
      },
      leave_status: {
        type: Sequelize.INTEGER
      },
      assigned_to_comments: {
        type: Sequelize.STRING(500)
      },
      added_date: {
        type: Sequelize.DATE
      },
      del_status: {
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      leave_type_id: {
        type: Sequelize.INTEGER
      },
      year: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('leave_tables');
  }
};