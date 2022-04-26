'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class holidays_list extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  holidays_list.init({
    holiday_id:{
      allowNull:false,
      autoIncrement:true,
      primaryKey:true,
      type:DataTypes.INTEGER
    },
    holiday_name: DataTypes.STRING(200),
    hoiday_date: DataTypes.STRING(45),
    holiday_type: DataTypes.STRING(45),
    created_at: DataTypes.DATE,
    del_status: DataTypes.INTEGER,
    year: DataTypes.STRING(20),
  }, {
    sequelize,
    modelName: 'holidays_list',
  });
  return holidays_list;
};