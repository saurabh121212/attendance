const Attendance = require("./DAO");
const { generateJWT, getDateTime, checkMissingFields } = require(__helpers + "/utils.js");

function punchIn(req, res, next) {
  let payload = req.body;
  let missingFields = checkMissingFields(payload, ['user_id', 'user_name', 'clock_in_time'])
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

  payload = { ...payload, attendance_date: getDate(), del_status: 1, createdAt: getDateTime()};
  Attendance.punchInCreate(payload)
    .then(result => {
      if (result[1] === false) {
        res.status(402).json({
          status: 402,
          result: {
            mes: "Punch In already marked"
          }
        })
      }
      else {
        res.status(200).json({
          status: 200,
          result: {
            mes: "Punch In Marked"
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
  let missingFields = checkMissingFields(payload, ['user_id', 'user_name', 'clock_out_time','date'])
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

  payload = { ...payload, created_at: getDateTime(), del_status: 1 };

  Attendance.punchOutCreate(req.params.attendance_id, payload)
    .then(result => {
      res.status(200).json({
        status: 200,
        result: {
          mes: "Punch Out Marked"
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
  Attendance.attendanceList(req.params.user_id, payload)
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


function getDate()
{
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
  attendanceList
}