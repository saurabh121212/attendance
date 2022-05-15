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
        allowNull:true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull:true,
        type: Sequelize.DATE
      }
    },
      {
        timestamps: false
      }).then(() => {
        queryInterface.bulkInsert("leave_types", [
          {
            leave_name: "Annual Leave",
            total_number_of_days: "0",
            eligible_for: "1",
            del_status: "2",
            year: "2022",
            createdAt:'2020-12-01',
            updatedAt:'2020-12-01'
          },
          {
            leave_name: "Maternity Leave",
            total_number_of_days: "0",
            eligible_for: "3",
            del_status: "2",
            year: "2022",
            createdAt:'2020-12-01',
            updatedAt:'2020-12-01'
          }
        ]);
      });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('leave_types');
  }
};