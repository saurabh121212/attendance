const { od_table, user } = require('../../models');
const { Op, Sequelize } = require("sequelize");
const sendEmail = require('../../helpers/email')


module.exports = {
    odApplication,
    applayOd,
    odRequest,
    odApproveReject
}

async function odApplication(payload = {}) {

    // finding a manager of employee
    const tableData = await user.findOne({
        where:{user_id:payload.apply_by_id}
    })

    const tableData2 = await user.findOne({
        where:{user_id:tableData.dataValues.manager_id}
    })


    // adding manager values in the payload
    payload = {...payload, send_to_id:tableData.dataValues.manager_id,send_to_name:tableData.dataValues.manager_name}


    // change email id
    sendEmail(tableData2.dataValues.email_id,payload, 3);

    // creating an leave application
    return od_table.create(
        payload
    )
}

function applayOd(apply_by_id)
{
    return od_table.findAll({
        where:{apply_by_id:apply_by_id}
    });
}

function odRequest(send_to_id)
{
    return od_table.findAll({
        where:{
            send_to_id:send_to_id
        }
    });
}


async function odApproveReject(od_id,payload={}){

     // finding employee details.
     const tableData = await user.findOne({
        where: { user_id: payload.apply_by_id }
    })

    const leaveStatus = payload.od_status == 3 ? "Approved" : "Rejected"

    //console.log("leave data ",tableData2.dataValues.email_id,"Leave Application",`${payload.leave_type} Leave applyed by ${payload.leave_apply_by_name}` );
    sendEmail(tableData.dataValues.email_id, payload, 4);


    return od_table.update(
      {
        od_status: payload.od_status,
        send_to_comments:payload.send_to_comments
     },  
      {
      where:{
        od_id:od_id
      }
       }).then((result)=>{
         return result
       })
  }