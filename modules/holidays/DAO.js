const { holidays_list } = require('../../models');
const { Op, Sequelize } = require("sequelize");


module.exports = {
    holidaysCreate,
    holidaysList,
    holidaysUpdate
}
async function holidaysCreate(payload = {}) {
  return holidays_list.create(
     payload
  )}

  async function holidaysList(){
    return holidays_list.findAll({
      where:{
        del_status:1
      }
    }).then((result)=>{
      return result
    })
  }

  async function holidaysUpdate(holiday_id,payload){
    return holidays_list.update(
      {
        holiday_name: payload.holiday_name,
        hoiday_date: payload.hoiday_date,
        year: payload.year,
        del_status: payload.del_status,
     },  
      {
      where:{
        holiday_id:holiday_id
      }
       }).then((result)=>{
         return result
       })
  }