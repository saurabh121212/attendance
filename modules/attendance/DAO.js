const db = require('../../models');
const { Op, Sequelize, QueryTypes } = require("sequelize");
const { sequelize } = require('../../models');

const attendance_history = db.attendance_history;
const od_table = db.od_table;
const leave_table = db.leave_table;


module.exports = {
    punchInCreate,
    punchOutCreate,
    attendanceList
}

async function punchInCreate(payload = {}) {
    return attendance_history.findOrCreate({
        where:{
            user_id:payload.user_id,
            attendance_date: payload.attendance_date
          },
          defaults: payload
    }).then((result) => {
        return result;
       })
}


async function punchOutCreate(attendanceId, payload = {}) {
    return attendance_history.update({
        clock_out_time: payload.clock_out_time,
        comments: payload.comments
    },
        {
        where: { 
            user_id: payload.user_id,
            attendance_date: payload.date
        }
        }).then((result) => {
            return result
        })
}

async function attendanceList(user_id, payload = {}) {

    const startDate = payload.start_date;
    const endDate = payload.end_date;

    const filterOfDate = {
        user_id: {[Op.eq]: user_id},
        createdAt: {[Op.gte]: payload.start_date},
        createdAt: {[Op.lte]: payload.end_date}
    }

    const odFilter = {
        apply_by_id: {[Op.eq]: user_id},
        od_date: {[Op.gte]: payload.start_date},
        od_date: {[Op.lte]: payload.end_date},
        od_status:{[Op.eq]: 3},
    }

    const leaveFilter = {
        leave_apply_by_id: {[Op.eq]: user_id},
        start_date: {[Op.gte]: payload.start_date},
        end_date: {[Op.lte]: payload.end_date},
        leave_status:{[Op.eq]: 3},
    }


    const attendanceListMonthly = await attendance_history.findAll({
        where: filterOfDate,
        order: [['attendance_id', 'DESC']],
    }).then((result) => {
        return result
    })

    const totalWorkingHrs = await db.sequelize.query(
        `SELECT  subtime( SEC_TO_TIME( SUM( TIME_TO_SEC( clock_out_time ) ) ),
        SEC_TO_TIME( SUM( TIME_TO_SEC( clock_in_time ) ) )) As timediff 
        FROM attendance_db.attendance_histories
        where user_id = ${user_id}
        and createdAt between '${startDate}' AND '${endDate}'`, 
        { type: QueryTypes.SELECT });


    const avgClockInTime = await db.sequelize.query(
        `SELECT SEC_TO_TIME(ROUND(AVG(TIME_TO_SEC(clock_in_time)),0)) 
        As avgTime FROM attendance_db.attendance_histories
        where user_id = ${user_id}
        and createdAt between '${startDate}' AND '${endDate}'`,
        { type: QueryTypes.SELECT });

    const avgClockOutTime = await db.sequelize.query(
        `SELECT SEC_TO_TIME(ROUND(AVG(TIME_TO_SEC(clock_out_time)),0)) As avgTime
        FROM attendance_db.attendance_histories 
        where user_id = ${user_id} 
        and createdAt between '${startDate}' AND '${endDate}'`,        
        { type: QueryTypes.SELECT });


        const odList = await od_table.findAll({
            where:odFilter
        })

        const odCount = await od_table.count({
            attributes: [
                [Sequelize.fn('COUNT', Sequelize.col('od_id')), 'odCount']
            ],
            where:odFilter
        })

        const leaveList = await leave_table.findAll({
            where:leaveFilter
        })

        const leaveCount = await leave_table.findAll({
            attributes: [
                [Sequelize.fn('sum', Sequelize.col('number_of_days')), 'leaveCount']
            ],
            where:leaveFilter
        });



    return {attendanceListMonthly,totalWorkingHrs,avgClockInTime,avgClockOutTime,odList,odCount,leaveList,leaveCount};
}