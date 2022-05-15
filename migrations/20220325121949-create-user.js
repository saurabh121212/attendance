'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      user_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_name: {
        type: Sequelize.STRING(200)
      },
      designation: {
        type: Sequelize.STRING(100)
      },
      date_of_joining: {
        type: Sequelize.DATE
      },
      gender: {
        type: Sequelize.STRING(45)
      },
      phone_number: {
        type: Sequelize.DOUBLE
      },
      email_id: {
        type: Sequelize.STRING(200)
      },
      department: {
        type: Sequelize.STRING(200)
      },
      manager_name: {
        type: Sequelize.STRING(200)
      },
      manager_id: {
        type: Sequelize.INTEGER
      },
      password: {
        type: Sequelize.STRING(200)
      },
      otp: {
        type: Sequelize.STRING(45)
      },
      created_at: {
        type: Sequelize.DATE
      },
      del_status: {
        type: Sequelize.INTEGER
      },
      user_type: {
        type: Sequelize.INTEGER
      },
      year: {
        type: Sequelize.DATE
      },
      token: {
        type: Sequelize.STRING(200)
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    }, {
      timestamps: false
    })
      .then(() => {
        queryInterface.bulkInsert("users", [
          {
            user_name: "Admin",
            designation: "System Admin",
            gender: "Male",
            phone_number: "123456789",
            email_id: "admin@gmail.com",
            password: "$2b$10$c1b28Wf5S3suemCUovCuTenWNXojzNO0/UJ5x.qFfscrpXSsT0oKi",
            del_status: 1,
            user_type: 1
          }
        ]);
      });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};