'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('holidays_lists', {
      holiday_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      holiday_name: {
        type: Sequelize.STRING(200)
      },
      hoiday_date: {
        type: Sequelize.DATE
      },
      holiday_type: {
        type: Sequelize.STRING(40)
      },
      created_at: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('holidays_lists');
  }
};