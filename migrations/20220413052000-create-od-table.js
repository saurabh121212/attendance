'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('od_tables', {
      od_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      od_date: {
        type: Sequelize.STRING(100)
      },
      od_start_time: {
        type: Sequelize.STRING(45)
      },
      od_end_time: {
        type: Sequelize.STRING(45)
      },
      od_comments: {
        type: Sequelize.STRING(500)
      },
      apply_by_id: {
        type: Sequelize.INTEGER
      },
      apply_by_name: {
        type: Sequelize.STRING(100)
      },
      send_to_id: {
        type: Sequelize.INTEGER
      },
      send_to_name: {
        type: Sequelize.STRING(100)
      },
      send_to_comments: {
        type: Sequelize.STRING(500)
      },
      od_status: {
        type: Sequelize.INTEGER
      },
      del_status: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('od_tables');
  }
};