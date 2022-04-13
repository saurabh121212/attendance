'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class od_table extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  od_table.init({
    od_id:{
      allowNull:false,
      autoIncrement:true,
      primaryKey:true,
      type:DataTypes.INTEGER
    },
    od_date: DataTypes.STRING(100),
    od_start_time: DataTypes.STRING(45),
    od_end_time: DataTypes.STRING(45),
    od_comments: DataTypes.STRING(500),
    apply_by_id: DataTypes.INTEGER,
    apply_by_name: DataTypes.STRING(100),
    send_to_id: DataTypes.INTEGER,
    send_to_name: DataTypes.STRING(100),
    send_to_comments: DataTypes.STRING(500),
    od_status: DataTypes.INTEGER,
    year: DataTypes.STRING,
    del_status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'od_table',
  });
  return od_table;
};