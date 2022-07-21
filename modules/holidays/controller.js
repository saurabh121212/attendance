const holidays = require("./DAO");
const { generateJWT, getDateTime, checkMissingFields } = require(__helpers + "/utils.js");


function holidaysCreate(req, res, next) {
    let payload = req.body;
    let missingFields = checkMissingFields(payload, ['holiday_name', 'hoiday_date', 'year'])
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
  
    holidays.holidaysCreate(payload)
      .then(result => {
        res.status(200).json({ 
          status: 200,
          result:{
            mes: "Holiday added successfully" 
          }
        })
      })
      .catch(err => {
        res.data = { err }
        return res;
      });
  }
  

  function holidaysList(req,res,next){

    holidays.holidaysList()
    .then(result=>{
      res.status(200).json({
        status: 200,
          result:{
            mes: "Holidays List",
            list:result
          }
      })
    })
  }

  
  function holidaysUpdate(req, res, next) {
    payload = req.body;
    if (!req.params.holiday_id) {
      res.status(400).json({
        status: 400,
        result: {
          msg: "fields are missing",
          list: []
        }
      })
      return next();
    }
  
    holidays.holidaysUpdate(req.params.holiday_id, payload)
      .then((result) => {
        res.status(200).json({
          status: 200,
          result:{
            mes: "Update Holidays Values Successfully",
            list: result
          }
        })
      }).catch(err => {
        res.data = { err }
        return res;
      })
  }
  

module.exports = {
    holidaysCreate,
    holidaysList,
    holidaysUpdate
}