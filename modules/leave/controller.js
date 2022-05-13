const Leave = require("./DAO");
const { generateJWT, getDateTime, checkMissingFields } = require(__helpers + "/utils.js");

function leaveApplication(req, res, next) {
    let payload = req.body;
    let missingFields = checkMissingFields(payload, ['leave_type','leave_type_id','number_of_days',
        'start_date','end_date','leave_apply_by_id','leave_apply_by_name','year'])
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
  
    payload = { ...payload, created_at: getDateTime(), del_status: 1 , leave_status:1 };
  
    Leave.leaveApplication(payload)
      .then(result => {  
        res.status(200).json({ 
          status: 200,
          result:{
            mes: "Leave Applied"
          }
        })
      })
      .catch(err => {
        console.log(err);
        res.data = { err }
      });
  }

  function applayLeave(req, res, next) {
    payload = req.body;
    if (!req.params.leave_apply_by_id) {
      res.status(400).json({
        status: 400,
        result: {
          msg: "fields are missing",
          list: []
        }
      })
      return next();
    }
  
    Leave.applayLeave(req.params.leave_apply_by_id)
      .then((result) => {
        res.status(200).json({
          status: 200,
          result:{
            mes: "List of Leaves Applied by emplyoee",
            list: result
          }
        })
      }).catch(err => {
        res.data = { err }
        return res;
      })
  }



  function leaveRequest(req, res, next) {
    payload = req.body;
    if (!req.params.assigned_to_id) {
      res.status(400).json({
        status: 400,
        result: {
          msg: "fields are missing",
          list: []
        }
      })
      return next();
    }
  
    Leave.leaveRequest(req.params.assigned_to_id)
      .then((result) => {
        res.status(200).json({
          status: 200,
          result:{
            mes: "List of Leave Application Recived",
            list: result
          }
        })
      }).catch(err => {
        res.data = { err }
        return res;
      })
  }


  function leaveApproveReject(req, res, next) {
    payload = req.body;
    if (!req.params.leave_id) {
      res.status(400).json({
        status: 400,
        result: {
          msg: "fields are missing",
          list: []
        }
      })
      return next();
    }
  
    Leave.leaveApproveReject(req.params.leave_id,payload)
      .then((result) => {
        res.status(200).json({
          status: 200,
          result:{
            mes: "Updated",
            list: result
          }
        })
      }).catch(err => {
        res.data = { err }
        return res;
      })
  }


  function leaveCount(req, res, next) {    
    let payload = req.body;
    let missingFields = checkMissingFields(payload, ['user_id','year'])
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
  
    Leave.leaveCount(payload)
      .then((result) => {
        res.status(200).json({
          status: 200,
          result:{
            mes: "Count of Leaves",
            list: result
          }
        })
      }).catch(err => {
        res.data = { err }
        console.log(err);
        return res;
      })
  }

  module.exports = {
    leaveApplication,
    applayLeave,
    leaveRequest,
    leaveApproveReject,
    leaveCount
  }