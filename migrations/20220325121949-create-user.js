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
      gender:{
        type: Sequelize.STRING(45)
      },


      phone_number:{
        type: Sequelize.DOUBLE
      },
      email_id:{
        type: Sequelize.STRING(200)
      },
      department:{
        type: Sequelize.STRING(200)
      },
      manager_name:{
        type: Sequelize.STRING(200)
      },
      manager_id:{
        type: Sequelize.INTEGER
      },
      password:{
        type: Sequelize.STRING(200)
      },
      otp:{
        type: Sequelize.STRING(45)
      },
      created_at:{
        type: Sequelize.DATE
      },
      del_status:{
        type: Sequelize.INTEGER
      },
      user_type:{
        type: Sequelize.INTEGER
      },
      year:{
        type: Sequelize.DATE
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
    await queryInterface.dropTable('Users');
  }
};