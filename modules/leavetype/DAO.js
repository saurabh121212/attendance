const { leave_type, user, leave_table } = require('../../models');
const { Op, Sequelize } = require("sequelize");


module.exports = {
  leaveTypeCreate,
  leaveTypelist,
  leaveTypeupdate,
  anualLeaveCount
}
async function leaveTypeCreate(payload = {}) {
  return leave_type.create(
    payload
  )
}

async function leaveTypelist(year) {
  return leave_type.findAll({
    where: {
      //year: year,
      del_status:
        { [Op.ne]: 0 }
    }
  }).then((result) => {
    return result
  })
}


async function leaveTypeupdate(leave_type_id, payload) {
  return leave_type.update(
    {
      leave_name: payload.leave_name,
      total_number_of_days: payload.total_number_of_days,
      year: payload.year,
      eligible_for: payload.eligible_for
    },
    {
      where: {
        leave_type_id: leave_type_id
      }
    }).then((result) => {
      return result
    })
}


async function anualLeaveCount(user_id, todayDate) {

  // Get Leave Count 
  let leaveCount = await leave_table.findAll({
    attributes: [
      "leave_type", "leave_type_id",
      [Sequelize.fn('SUM', Sequelize.col('number_of_days')), 'TotalLeaves']
    ],
    group: 'leave_type',
    raw: true,
    where: {
      leave_apply_by_id: user_id,
      leave_type: "Annual Leave",
      leave_status: {
        [Op.ne]: 2
      }
    }
  });


  console.log("leaveCount ", leaveCount);

  // Get Total Number Of Leaves
  let userData = await user.findOne({
    attributes: { exclude: ['password', 'otp'] },
    where: { user_id: user_id },
  })



  let parseJson;

  // for Kunal Sir.
  if (user_id == 16) {

    let diffrenceValue = userData.dataValues.date_of_joining.toISOString().split("T")[0] - todayDate.split(" ")[0];
    let totalNumberOfLeaves = diffrenceValue * 40;

    parseJson = {
      id: 1,
      name: "Annual Leave",
      numberOfDays: 0,
      leaveCount: totalNumberOfLeaves
    }
  }

  // For All others
  else {
    console.log("test ", userData.dataValues.date_of_joining);
    let dateOfJoinging = userData.dataValues.date_of_joining.toISOString().split("T")[0];
    console.log("test2 ", dateOfJoinging);

    todayDate = todayDate.split(" ")[0];

    let diffMonths = monthDiff(dateOfJoinging, todayDate);
    console.log("dateOFJoining ", dateOfJoinging, " today date ", todayDate, " month diff ", diffMonths);
    //console.log("month diff ", diffMonths);

    if (diffMonths <= 3) {
      parseJson = {
        id: 1,
        name: "Annual Leave",
        numberOfDays: 0,
        leaveCount: leaveCount
      }
    }
    else {
      let div = parseInt(diffMonths / 4);
      console.log("m testing 01 ", div, " ", diffMonths);
      diffMonths = diffMonths + div;
      parseJson = {
        id: 1,
        name: "Annual Leave",
        numberOfDays: diffMonths,
        leaveCount: leaveCount
      }
    }
  }

  // else if (diffMonths >= 12) {
  //   let dateOfJoinging2 = dateOfJoinging.split("-")

  //   // if employee join befour 15th 
  //   if (dateOfJoinging2[2] < 15) {
  //     let div = parseInt(diffMonths / 12);
  //     diffMonths = diffMonths + div + 1;
  //     parseJson = {
  //       id: 1,
  //       name: "Annual Leave",
  //       numberOfDays: diffMonths,
  //       leaveCount:leaveCount
  //     }
  //   }
  //   else {
  //     let div = parseInt(diffMonths / 12);
  //     diffMonths = diffMonths + div;
  //     parseJson = {
  //       id: 1,
  //       name: "Annual Leave",
  //       numberOfDays: diffMonths,
  //       leaveCount:leaveCount
  //     }
  //   }
  // }
  return parseJson
}

function monthDiff(d1, d2) {
  d1 = new Date(d1);
  d2 = new Date(d2);
  try {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
  }
  catch (e) {
    console.log(e);
  }
}