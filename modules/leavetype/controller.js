const leaveType = require("./DAO");
const { generateJWT, getDateTime, checkMissingFields } = require(__helpers + "/utils.js");


function leaveTypeCreate(req, res, next) {
    let payload = req.body;
    let missingFields = checkMissingFields(payload, ['leave_name', 'total_number_of_days', 'year'])
    if (missingFields.length) {
      res.status(400).json( {
        status: 400,
        result: {
          msg: "fields are missing",
          list: missingFields
        }
      })
      return next()
    }
  
    payload = { ...payload, created_at: getDateTime(), del_status: 1 };
  
    leaveType.leaveTypeCreate(payload)
      .then(result => {
        res.status(200).json({ 
          status: 400,
          result:{
            mes: "leave Type add"
          }
        })
      })
      .catch(err => {
        res.data = { err }
      });
  }
  

  function leaveTypelist(req,res,next){

    leaveType.leaveTypelist()
    .then(result=>{
      res.status(200).json({
        status: 200,
          result:{
            mes: "leave List",
            list:result
          }
      })
    })
  }

  

  function leaveTypeupdate(req, res, next) {
    payload = req.body;
    if (!req.params.leave_type_id) {
      res.status(400).json({
        status: 400,
        result: {
          msg: "fields are missing",
          list: []
        }
      })
      return next();
    }
  
    leaveType.leaveTypeupdate(req.params.leave_type_id, payload)
      .then((result) => {
        res.status(200).json({
          status: 200,
          result:{
            mes: "Update Leave Type Value",
            list: result
          }
        })
      }).catch(err => {
        res.data = { err }
        return res;
      })
  }
  

module.exports = {
    leaveTypeCreate,
    leaveTypelist,
    leaveTypeupdate
}