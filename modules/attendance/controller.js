const Attendance = require("./DAO");
const { generateJWT, getDateTime, checkMissingFields } = require(__helpers + "/utils.js");

function punchIn(req, res, next) {
  let payload = req.body;
  let missingFields = checkMissingFields(payload, ['user_id', 'user_name', 'attendance_date'])
  if (missingFields.length) {
    res.status(400).json({
      status: 400,
      result: {
        msg: "fields are missing",
        list: missingFields
      }
    })
    return next()
  }

  // to get server timings
  var today = new Date();
  var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date + ' ' + time;
  //  var time = today.getHours() + 2 + ":" + today.getMinutes();
  var hours, minutes;
  hours = today.getHours();
  hours = parseInt(hours);

  minutes = today.getMinutes();

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (today.getMinutes() < 10) {
    minutes = "0" + today.getMinutes();
  }

  var time = hours + ":" + minutes;

  //time = parseInt(time) + 2;
  console.log("this is Testing date time  ", dateTime, " time ", time);

  payload = { ...payload, del_status: 1, createdAt: getDateTime(), "clock_in_time": time };

  Attendance.punchInCreate(payload)
    .then(result => {
      console.log(result);
      if (result === 2) {
        res.status(402).json({
          status: 402,
          result: {
            mes: "You are already applyed OD for this date ",
          }
        })
      }
      else if (result === 3) {
        res.status(402).json({
          status: 402,
          result: {
            mes: "You are already applyed Leave for this date",
          }
        })
      }

      else if (result[1] === false) {
        res.status(402).json({
          status: 402,
          result: {
            mes: "Punch In already marked",
          }
        })
      }
      else {
        res.status(200).json({
          status: 200,
          result: {
            mes: "Punch In Marked Successfully",
            date: payload.attendance_date,
            time: payload.clock_in_time
          }
        })
      }
    }).catch(err => {
      console.log(err);
      res.data = { err }
      return res;
    });
}



function punchOut(req, res, next) {
  let payload = req.body;
  let missingFields = checkMissingFields(payload, ['user_id', 'user_name', 'date'])
  if (missingFields.length) {
    res.status(400).json({
      status: 400,
      result: {
        msg: "fields are missing",
        list: missingFields
      }
    })
    return next()
  }


  // to get server timings
  var today = new Date();
  var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date + ' ' + time;

  var hours, minutes;
  hours = today.getHours();
  hours = parseInt(hours);

  minutes = today.getMinutes();
  console.log("tedt", hours);

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (today.getMinutes() < 10) {
    minutes = "0" + today.getMinutes();
  }

  var time = hours + ":" + minutes;

  console.log("this is Testing date time  ", dateTime, " time ", time);
  payload = { ...payload, created_at: getDateTime(), del_status: 1, "clock_out_time": time };

  Attendance.punchOutCreate(req.params.attendance_id, payload)
    .then(result => {
      res.status(200).json({
        status: 200,
        result: {
          mes: "Punch Out Marked Successfully",
          date: payload.date,
          time: payload.clock_out_time
        }
      })
    })
    .catch(err => {
      console.log(err);
      res.data = { err }
    });
}



function attendanceList(req, res, next) {
  let payload = req.body;
  Attendance.attendanceList(payload)
    .then(result => {
      res.status(200).json({
        status: 200,
        result: {
          mes: "Attendence List",
          list: result
        }
      })
    })
    .catch(err => {
      console.log(err);
      res.data = { err }
    });
}


function attendancePunchInPunchOut(req, res, next) {
  let payload = req.body;
  Attendance.attendancePunchInPunchOut(payload.user_id, payload.attendance_date)
    .then(result => {
      if (result) {
        res.status(200).json({
          status: 200,
          result: {
            mes: "Attendence Data",
            list: result
          }
        })
      }
      else {
        res.status(205).json({
          status: 205,
          result: {
            mes: "Attendance Not Mark Today",
            list: result
          }
        })
      }
    })
    .catch(err => {
      console.log(err);
      res.data = { err }
    });
}


function attendanceListV2(req, res, next) {
  let payload = req.body;

  Attendance.attendanceListV2(payload)
    .then(result => {
      res.status(200).json({
        status: 200,
        result: {
          mes: "Attendence List",
          list: result
        }
      })
    })
    .catch(err => {
      console.log(err);
      res.data = { err }
    });
}



function singleDayEmpDetails(req, res, next) {
  let payload = req.body;

  // payload data current_date
  Attendance.singleDayEmpDetails(payload)
    .then(result => {
      res.status(200).json({
        status: 200,
        result: {
          mes: "Single Day Employee Details",
          list: result
        }
      })
    })
    .catch(err => {
      console.log(err);
      res.data = { err }
    });
}




function attendanceListV3(req, res, next) {
  let payload = req.body;

  //console.log("datamyset ",req.body);

  res.status(200).json({
    mes: "done",
    data1: req.body
  })
}



function getDate() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  today = yyyy + '-' + mm + '-' + dd;
  return today;
}


module.exports = {
  punchIn,
  punchOut,
  attendanceList,
  attendanceListV2,
  attendanceListV3,
  attendancePunchInPunchOut,
  singleDayEmpDetails
}