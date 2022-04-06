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
  
    payload = { ...payload, created_at: getDateTime(), del_status: 1 };
  
    Attendance.punchInCreate(payload)
      .then(result => {
        res.status(200).json({ 
          status: 200,
          result:{
            mes: "punch In Marked"
          }
        })
      })
      .catch(err => {
        console.log(err);
        res.data = { err }
      });
  }


  function punchOut(req, res, next) {
    let payload = req.body;
    let missingFields = checkMissingFields(payload, ['user_id', 'user_name', 'clock_out_time'])
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
  
    Attendance.punchOutCreate(req.params.attendance_id,payload)
      .then(result => {
        res.status(200).json({ 
          status: 200,
          result:{
            mes: "punch Out Marked"
          }
        })
      })
      .catch(err => {
        console.log(err);
        res.data = { err }
      });
  }




  module.exports = {
    punchIn,
    punchOut
  }