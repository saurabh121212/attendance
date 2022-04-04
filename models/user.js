'use strict';
const {
  Model, INTEGER
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    user_id:{
      allowNull:false,
      autoIncrement:true,
      primaryKey:true,
      type:DataTypes.INTEGER
    },
    user_name: DataTypes.STRING(200),
    designation: DataTypes.STRING(100),
    date_of_joining: DataTypes.DATE,
    gender: DataTypes.STRING(45),
    phone_number: DataTypes.DOUBLE,
    email_id: DataTypes.STRING(200),
    department: DataTypes.STRING(200),
    manager_name: DataTypes.STRING(200),
    manager_id: DataTypes.INTEGER,
    password: DataTypes.STRING(200),
    otp: DataTypes.STRING(45),
    created_at: DataTypes.DATE,
    del_status: DataTypes.INTEGER,
    user_type: DataTypes.INTEGER,
    year: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'user',
  });
  return User;
};