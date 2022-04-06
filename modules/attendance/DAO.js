const { attendance_history } = require('../../models');
const { Op, Sequelize } = require("sequelize");


module.exports = {
    punchInCreate,
    punchOutCreate
}

async function punchInCreate(payload = {}) {
    return attendance_history.create(
        payload
    )
}


async function punchOutCreate(attendanceId, payload = {}) {
    return attendance_history.update({
        clock_out_time: payload.clock_out_time,
        comments:payload.comments
    },
        {
            where: {
                attendance_id: attendanceId
            }
        }).then((result) => {
            return result
        })
}