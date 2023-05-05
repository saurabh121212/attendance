const leaveType = require("./DAO");
const { generateJWT, getDateTime, checkMissingFields } = require(__helpers + "/utils.js");


function leaveTypeCreate(req, res, next) {
    let payload = req.body;
    let missingFields = checkMissingFields(payload, ['leave_name', 'total_number_of_days', 'year',
  'eligible_for'])
    if (missingFields.length) {
      res.status(400).json({
        status: 400,
        result: {
          msg: "fields are missing",
          list: missingFields
        }
      })
      return next();
    }
    payload = { ...payload, created_at: getDateTime(), del_status: 1 };

    leaveType.leaveTypeCreate(payload)
      .then(result => {
        res.status(200).json({ 
          status: 200,
          result:{
            mes: "leave Type added successfully"
          }
        })
      })
      .catch(err => {
        res.data = { err }
        return res.data;
      });
  }
  
  function leaveTypelist(req,res){


     
    console.log(dateTime)
    if (!req.params.year) {
      res.status(400).json({
        status: 400,
        result: {
          msg: "fields are missing",
          list: []
        }
      })
      return next();
    }

    leaveType.leaveTypelist(req.params.year)
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
            mes: "Update leave type successfully",
            list: result
          }
        })
      }).catch(err => {
        res.data = { err }
        return res;
      })
  }
  
  
  function anualLeaveCount(req, res, next) {
    if (!req.params.user_id) {
      res.status(400).json({
        status: 400,
        result: {
          msg: "fields are missing",
          list: []
        }
      })
      return next();
    }
  
    leaveType.anualLeaveCount(req.params.user_id,getDateTime())
      .then((result) => {
        res.status(200).json({
          status: 200,
          result:{
            mes: "Annual Leave Count",
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
    leaveTypeupdate,
    anualLeaveCount
}