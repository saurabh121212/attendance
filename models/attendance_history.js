'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class attendance_history extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  attendance_history.init({
    attendance_id:{
      allowNull:false,
      autoIncrement:true,
      primaryKey:true,
      type:DataTypes.INTEGER
    },
    user_id: DataTypes.INTEGER,
    user_name: DataTypes.STRING(200),
    clock_in_time: DataTypes.STRING(50),
    clock_out_time: DataTypes.STRING(50),
    comments: DataTypes.STRING(500),
    del_status: DataTypes.INTEGER,
    created_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'attendance_history',
  });
  return attendance_history;
};