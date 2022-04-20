const AdminData = require("./DAO");
const { generateJWT, getDateTime, checkMissingFields } = require(__helpers + "/utils.js");


function adminTotal(req, res, next) {
    payload = req.body;
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
  
    AdminData.adminTotal(req.params.user_id,getDate())
      .then((result) => {
        res.status(200).json({
          status: 200,
          result:{
            mes: "Admin DashBoard Data",
            list: result
          }
        })
      }).catch(err => {
        res.data = { err }
        console.log(err)
        return res;
      })
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
    adminTotal
  }