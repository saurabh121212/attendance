'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class leave_type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  leave_type.init({
    leave_type_id:{
      allowNull:false,
      autoIncrement:true,
      primaryKey:true,
      type:DataTypes.INTEGER
    },
    leave_name: DataTypes.STRING(200),
    total_number_of_days: DataTypes.INTEGER,
    eligible_for: DataTypes.STRING(200),
    del_status: DataTypes.INTEGER,
    year: DataTypes.STRING(20)
  }, {
    sequelize,
    modelName: 'leave_type',
  });
  return leave_type;
};