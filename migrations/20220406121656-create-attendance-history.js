'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('attendance_histories', {
      attendance_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      user_name: {
        type: Sequelize.STRING(200)
      },
      clock_in_time: {
        type: Sequelize.STRING(50)
      },
      clock_out_time: {
        type: Sequelize.STRING(50)
      },
      comments: {
        type: Sequelize.STRING(500)
      },
      punch_out_comments: {
        type: Sequelize.STRING(500)
      },
      del_status: {
        type: Sequelize.INTEGER
      },
      attendance_date: {
        type: Sequelize.STRING(100)
      },
      year: {
        type: Sequelize.STRING(45)
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
    await queryInterface.dropTable('attendance_histories');
  }
};