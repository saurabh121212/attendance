const { leave_table, user, od_table, attendance_history } = require('../../models');
const { Op, Sequelize } = require("sequelize");

module.exports = {
    adminTotal,
}

async function adminTotal(user_id,date) {

    console.log("Date ",date);

    const useCountFilter = {
        user_type: 2,
        del_status: 1
    }

    const odCountFilter = {
        od_status:  {
            [Op.eq]: 2
        },
        od_date: date,
    }

    const presentCountFinter = {
        attendance_date: date,
    }
    
    const filterOnLeaveToday = {
        leave_status: {
            [Op.eq]: 2
        },
        start_date: {
            [Op.lte]: date  
        },
        end_date: {
            [Op.gte]: date
        }
    }

    const lateCountFilter = {
        clock_in_time: {
            [Op.gte]: '08:15'
        },
        attendance_date: date,
    }

    // this is for count total number of emp.
    const userCout = await user.count({
        attributes: [
            [Sequelize.fn('COUNT', Sequelize.col('user_id')), 'totalUser']
        ],
        where: useCountFilter
    });

    // This is for count total number of OD 
    const odCount = await od_table.count({
        attributes: [
            [Sequelize.fn('COUNT', Sequelize.col('od_date')), 'totalODUser']
        ],
        where: odCountFilter
    });

    const odCountList = await od_table.findAll({
        where: odCountFilter
    });

    // This is for count total number of persent emp 
    const presentToday = await attendance_history.count({
        attributes: [
            [Sequelize.fn('COUNT', Sequelize.col('attendance_date')), 'presentToday']
        ],
        where: presentCountFinter
    });

    // this is for persent emp list
    const presentTodayList = await attendance_history.findAll({
        where: presentCountFinter
    });

    // This is for count total number of Leaved emp 
    const onLeaveToday = await leave_table.count({
        attributes: [
            [Sequelize.fn('COUNT', Sequelize.col('start_date')), 'onLeaveToday']
        ],
        where: filterOnLeaveToday
    });

    // This is for List of total number of Leaved emp 
    const onLeaveTodayList = await leave_table.findAll({
        where: filterOnLeaveToday
    });

    // This is for count total number of persent emp 
    const lateToday = await attendance_history.count({
        attributes: [
            [Sequelize.fn('COUNT', Sequelize.col('attendance_id')), 'lateToday']
        ],
        where: lateCountFilter
    });

        // This is for count total number of persent emp 
        const lateTodayList = await attendance_history.findAll({
            where: lateCountFilter
        });

    return { userCout, odCount, presentToday, onLeaveToday, lateToday, presentTodayList, onLeaveTodayList,lateTodayList,odCountList };
}
