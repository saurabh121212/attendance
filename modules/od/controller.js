const OD = require("./DAO");
const { generateJWT, getDateTime, checkMissingFields } = require(__helpers + "/utils.js");

function odApplication(req, res, next) {
    let payload = req.body;
    let missingFields = checkMissingFields(payload, ['od_date','od_start_time','od_end_time',
        'od_comments','apply_by_id','apply_by_name','year'])
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
  
    payload = { ...payload, created_at: getDateTime(), del_status: 1 , od_status:1 };
  
    OD.odApplication(payload)
      .then(result => {
        res.status(200).json({ 
          status: 200,
          result:{
            mes: "OD Applied Successfully"
          }
        })
      })
      .catch(err => {
        console.log(err);
        res.data = { err }
      });
  }

  function applayOd(req, res, next) {
    payload = req.body;
    if (!req.params.apply_by_id) {
      res.status(400).json({
        status: 400,
        result: {
          msg: "fields are missing",
          list: []
        }
      })
      return next();
    }
  
    OD.applayOd(req.params.apply_by_id)
      .then((result) => {
        res.status(200).json({
          status: 200,
          result:{
            mes: "List of OD Applied by emplyoee",
            list: result
          }
        })
      }).catch(err => {
        res.data = { err }
        return res;
      })
  }



  function odRequest(req, res, next) {
    payload = req.body;
    if (!req.params.send_to_id) {
      res.status(400).json({
        status: 400,
        result: {
          msg: "fields are missing",
          list: []
        }
      })
      return next();
    }
  
    OD.odRequest(req.params.send_to_id)
      .then((result) => {
        res.status(200).json({
          status: 200,
          result:{
            mes: "List of OD Application Recived",
            list: result
          }
        })
      }).catch(err => {
        res.data = { err }
        return res;
      })
  }


  function odApproveReject(req, res, next) {
    payload = req.body;
    if (!req.params.od_id) {
      res.status(400).json({
        status: 400,
        result: {
          msg: "fields are missing",
          list: []
        }
      })
      return next();
    }
  
    OD.odApproveReject(req.params.od_id,payload)
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



module.exports = {
    odApplication,
    applayOd,
    odRequest,
    odApproveReject
  }