'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class leave_table extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  leave_table.init({
    leave_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type:DataTypes.INTEGER
    },
    leave_name: DataTypes.STRING(200),
    leave_type: DataTypes.STRING(200),
    leave_type_id:DataTypes.INTEGER,
    number_of_days: DataTypes.INTEGER,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    leave_apply_by_id: DataTypes.INTEGER,
    leave_apply_by_name: DataTypes.STRING(200),
    leave_apply_by_comments: DataTypes.STRING(500),
    assigned_to_id: DataTypes.INTEGER,
    assigned_to_name: DataTypes.STRING(200),
    leave_status: DataTypes.INTEGER,
    assigned_to_comments: DataTypes.STRING(500),
    added_date: DataTypes.DATE,
    del_status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'leave_table',
  });
  return leave_table;
};