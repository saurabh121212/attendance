const db = require('../../models');
const { Op, Sequelize, QueryTypes } = require("sequelize");
const { sequelize } = require('../../models');

const attendance_history = db.attendance_history;
const od_table = db.od_table;
const leave_table = db.leave_table;
const holidays_list = db.holidays_list;



module.exports = {
    punchInCreate,
    punchOutCreate,
    attendanceList,
    attendanceListV2,
    attendancePunchInPunchOut
}

async function punchInCreate(payload = {}) {
    return attendance_history.findOrCreate({
        where: {
            user_id: payload.user_id,
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
        punch_out_comments: payload.comments
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
        user_id: { [Op.eq]: user_id },
        createdAt: { [Op.gte]: payload.start_date },
        createdAt: { [Op.lte]: payload.end_date }
    }

    const odFilter = {
        apply_by_id: { [Op.eq]: user_id },
        od_date: { [Op.gte]: payload.start_date },
        od_date: { [Op.lte]: payload.end_date },
        od_status: { [Op.eq]: 3 },
    }

    const leaveFilter = {
        leave_apply_by_id: { [Op.eq]: user_id },
        start_date: { [Op.gte]: payload.start_date },
        end_date: { [Op.lte]: payload.end_date },
        leave_status: { [Op.eq]: 3 },
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
        where: odFilter
    })

    const odCount = await od_table.count({
        attributes: [
            [Sequelize.fn('COUNT', Sequelize.col('od_id')), 'odCount']
        ],
        where: odFilter
    })

    const leaveList = await leave_table.findAll({
        where: leaveFilter
    })

    const leaveCount = await leave_table.findAll({
        attributes: [
            [Sequelize.fn('sum', Sequelize.col('number_of_days')), 'leaveCount']
        ],
        where: leaveFilter
    });

    return { attendanceListMonthly, totalWorkingHrs, avgClockInTime, avgClockOutTime, odList, odCount, leaveList, leaveCount };
}


async function attendanceListV2(payload = {}) {
    user_id = payload.user_id;
    let my_date = payload.start_date.split('-')
    let year = parseInt(my_date[0]);
    let month = parseInt(my_date[1]) - 1;

    let dataObject = {};
    let findatData = [];

    let nationalHoliday;
    let attendanceHistories;
    let odList;
    let leaveList;

    for (let i = 1; i <= new Date(year, month, 0).getDate(); i++) {
        let date = new Date(year, month, i);

        // This is for satuday Calculation in a month
        if (date.getDay() == 6) {
            dataObject = {
                id: i,
                status: 1,
                status_text: "Saturday",
                date: dateConversion(date)
            }
        }
        // This code is for sundays for a month. 
        else if (date.getDay() == 0) {
            dataObject = {
                id: i,
                status: 2,
                status_text: "Sunday",
                date: dateConversion(date)
            }
        }

        // this code is for check persent today in the system 
        else if (date.getDay() !== 0 && date.getDay() !== 6) {
            attendanceHistories = await attendance_history.findOne({
                where: {
                    attendance_date: dateConversion(date),
                    user_id: user_id
                }
            });

            dataObject = {
                id: i,
                status: 4,
                status_text: "Present Today",
                date: dateConversion(date),
                attendance_data: attendanceHistories
            }
        }

        // this code is for check OD today
        if (attendanceHistories == null && date.getDay() != 6 && date.getDay() != 0) {
            // check Od 
            odList = await od_table.findOne({
                where: {
                    od_date: dateConversion(date),
                    apply_by_id: user_id,

                }
            })
            dataObject = {
                id: i,
                status: 5,
                status_text: "OD Data",
                date: dateConversion(date),
                od_data: odList
            }
        }

        // This code is for check who is on Leave
        if (attendanceHistories == null && odList == null && date.getDay() != 6 && date.getDay() != 0) {
            leaveList = await leave_table.findOne({
                where: {
                    start_date: {
                        [Op.lte]: dateConversion(date)
                    },
                    end_date: {
                        [Op.gte]: dateConversion(date)
                    },
                    leave_status: {
                        [Op.ne]: 2
                    },
                    leave_apply_by_id: user_id
                }
            });

            dataObject = {
                id: i,
                status: 8,
                status_text: "Leave Data",
                date: dateConversion(date),
                leave_data: leaveList
            }
        }

        // this is for national holiday
        if (attendanceHistories == null && odList == null && leaveList == null && date.getDay() != 6 && date.getDay() != 0) {
            nationalHoliday = await holidays_list.findOne({
                where: {
                    hoiday_date: dateConversion(date)
                }
            });
            dataObject = {
                id: i,
                status: 3,
                status_text: "Natioal Holiday",
                date: dateConversion(date),
                holiday: nationalHoliday
            }
        }
        // This code is for check who is not mark attendance
        if (attendanceHistories == null && odList == null && leaveList == null
            && nationalHoliday == null && date.getDay() != 6 && date.getDay() != 0) {
            dataObject = {
                id: i,
                status: 11,
                status_text: "Not Mark Today",
                date: dateConversion(date),
            }
        }
        findatData.push(dataObject);
    };
    return findatData;
}


async function attendancePunchInPunchOut(user_id, date) {
    return attendance_history.findOne({
      where: { 
          user_id: user_id,
          attendance_date:date,
          del_status:1
            },
    })
      .then(result => {
        return result
      })
  }


dateConversion = (date) => {
    let dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
        .toISOString()
        .split("T")[0];
    return dateString;
}
