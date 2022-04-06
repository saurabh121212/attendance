const { leave_type } = require('../../models');
const { Op, Sequelize } = require("sequelize");


module.exports = {
    leaveTypeCreate,
    leaveTypelist,
    leaveTypeupdate,
}
async function leaveTypeCreate(payload = {}) {
  return leave_type.create(
     payload
  )}

  async function leaveTypelist(){
    return leave_type.findAll({
    }).then((result)=>{
      return result
    })
  }

  async function leaveTypeupdate(leave_type_id,payload){
    return leave_type.update(
      {
        leave_name: payload.leave_name,
        total_number_of_days: payload.total_number_of_days,
        year: payload.year,
     },  
      {
      where:{
        leave_type_id:leave_type_id
      }
       }).then((result)=>{
         return result
       })
  }