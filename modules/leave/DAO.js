const { leave_table, user, attendance_history ,od_table,holidays_list} = require('../../models');
const { Op, Sequelize } = require("sequelize");
const sendEmail = require('../../helpers/email')


module.exports = {
    leaveApplication,
    applayLeave,
    leaveRequest,
    leaveApproveReject,
    leaveCount,
    leaveCountAnnual
}

async function leaveApplication(payload = {}) {

    // check attendance
    let attendanceMarked = await attendance_history.findOne({
        where: {
            attendance_date: {
                [Op.gte]: payload.start_date,
                [Op.lte]: payload.end_date
            },
            user_id: payload.leave_apply_by_id,
        }
    })

    if (attendanceMarked != null) {
        return result = 1;
    }

    // check Od 
    let odList = await od_table.findOne({
        where: {
            od_date: {
                [Op.gte]: payload.start_date,
                [Op.lte]: payload.end_date
            },
            apply_by_id: payload.leave_apply_by_id,
            od_status: {
                [Op.ne]: 2
            }
        }
    })

    if (odList != null) {
        return result = 2;
    }



    // check Already Applyed for Leave
    let leaveList = await leave_table.findOne({
        where: {
            start_date: {
                [Op.gte]: payload.start_date
            },
            end_date: {
                [Op.lte]: payload.end_date
            },
            leave_status: {
                [Op.ne]: 2
            },
            leave_apply_by_id: payload.leave_apply_by_id
        }
    });

    if(leaveList!= null)
    {
        return result = 3;
    }


    // // check for national holiday. 
    // let holidayList = await holidays_list.findOne({
    //     where:{
    //         hoiday_date: {
    //             [Op.gte]: payload.start_date,
    //             [Op.lte]: payload.end_date
    //         },
    //       del_status:1,
    //     }
    //   })

    //   if(holidayList!= null)
    //   {
    //        return result = 4;
    //   }

    // finding a manager of employee
    const tableData = await user.findOne({
        where: { user_id: payload.leave_apply_by_id }
    })

    const tableData2 = await user.findOne({
        where: { user_id: tableData.dataValues.manager_id }
    })

    // adding manager values in the payload
    payload = { ...payload, assigned_to_id: tableData.dataValues.manager_id, assigned_to_name: tableData.dataValues.manager_name }


    //console.log("leave data ",tableData2.dataValues.email_id,"Leave Application",`${payload.leave_type} Leave applyed by ${payload.leave_apply_by_name}` );
    sendEmail(tableData2.dataValues.email_id, payload, 1);

    //sendEmail("saurabhsaini38@gmail.com","Leave Application",`${payload.leave_type} applyed by ${payload.leave_apply_by_name} from ${payload.start_date} To ${payload.end_date}.`);

    // creating an leave application
    return leave_table.create(
        payload
    )
}

function applayLeave(leave_apply_by_id) {
    return leave_table.findAll({
        where: { leave_apply_by_id: leave_apply_by_id }
    })
}


function leaveRequest(assigned_to_id) {
    return leave_table.findAll({
        where: { assigned_to_id: assigned_to_id }
    })
}


async function leaveApproveReject(leave_id, payload = {}) {

    // finding employee details.
    const tableData = await user.findOne({
        where: { user_id: payload.leave_apply_by_id }
    })


  //  const leaveStatus = payload.leave_status == 3 ? "Approved" : "Rejected"
    //console.log("leave data ",tableData2.dataValues.email_id,"Leave Application",`${payload.leave_type} Leave applyed by ${payload.leave_apply_by_name}` );

    return leave_table.update(
        {
            leave_status: payload.leave_status,
            assigned_to_comments: payload.assigned_to_comments
        },
        {
            where: {
                leave_id: leave_id
            }
        }).then(async ()=>{
            // new change.
            const tableData2 = await leave_table.findOne({
                where: { leave_id: leave_id }
            })
                sendEmail(tableData.dataValues.email_id, tableData2.dataValues, 2);
        }).then((result) => {
            return result
        })
}

function leaveCount(payload = {}) {
    return leave_table.findAll({
        attributes: [
            "leave_type", "leave_type_id",
            [Sequelize.fn('SUM', Sequelize.col('number_of_days')), 'TotalLeaves']
        ],
        group: 'leave_type',
        raw: true,
        where: {
            leave_apply_by_id: payload.user_id,
            year: payload.year,
            leave_status: {
                [Op.ne]: 2
            }
        }
    });
}


function leaveCountAnnual(payload = {}) {
    return leave_table.findAll({
        attributes: [
            "leave_type", "leave_type_id",
            [Sequelize.fn('SUM', Sequelize.col('number_of_days')), 'TotalLeaves']
        ],
        group: 'leave_type',
        raw: true,
        where: {
            leave_type: "Annual Leave",
            leave_apply_by_id: payload.user_id,
            leave_status: {
                [Op.ne]: 2
            }
        }
    });
}