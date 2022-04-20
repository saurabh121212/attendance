const { leave_table, user } = require('../../models');
const { Op, Sequelize } = require("sequelize");

module.exports = {
    leaveApplication,
    applayLeave,
    leaveRequest,
    leaveApproveReject,
    leaveCount
}

async function leaveApplication(payload = {}) {

    // finding a manager of employee
    const tableData = await user.findOne({
        where: { user_id: payload.leave_apply_by_id }
    })

    // adding manager values in the payload
    payload = { ...payload, assigned_to_id: tableData.dataValues.manager_id, assigned_to_name: tableData.dataValues.manager_name }

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
    return leave_table.update(
        {
            leave_status: payload.leave_status,
            assigned_to_comments: payload.assigned_to_comments
        },
        {
            where: {
                leave_id: leave_id
            }
        }).then((result) => {
            return result
        })
}


function leaveCount(payload ={}) {
    return leave_table.findAll({
        attributes: [
            "leave_type","leave_type_id",
            [Sequelize.fn('SUM', Sequelize.col('number_of_days')), 'TotalLeaves']
        ],
        group: 'leave_type',
        where: {
            leave_apply_by_id:payload.user_id,
            year:payload.year
        }
    })
}