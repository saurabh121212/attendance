const User = require("./DAO");
const { generateJWT, getDateTime, checkMissingFields } = require(__helpers + "/utils.js");
const bcrypt = require("bcrypt");

//const res = require("express/lib/response");

function ragister(req, res, next) {
  let payload = req.body;
  let missingFields = checkMissingFields(payload, ['user_name', 'designation', 'date_of_joining',
    'gender', 'phone_number', 'email_id', 'manager_id', 'manager_name', 'password', 'user_type'])
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

  payload.password = bcrypt.hashSync(payload.password, 10);
  payload = { ...payload, created_at: getDateTime(), del_status: 1 };

  User.ragister(payload)
    .then(result => {
      if (result[1] === false) {
        res.status(401).json({
          status: 400,
          result: {
            mes: "Email already Exists"
          }
        })
      }
      else {
        res.status(200).json({
          status: 200,
          result:{
            mes: "User add"
          } 
        })
      }
    })
    .catch(err => {
      res.data = { err }
    });
}


function login(req, res, next) {
  let payload = req.body;
  let missingFields = checkMissingFields(payload, ['email_id', 'password'])
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

  User.login(payload)
    .then(result => {
      console.log("restult ", result);
      if (result) {
        // Check Password 
        if (bcrypt.compareSync(payload.password, result.password)) {
          res.status(200).json({
            status: 200,
            result:{
              mes: "Login Done",
              list: result
            } 
          })
        }
        else {
          res.status(401).json({
            status: 401,
            result:{
              mes: "Password Incorect"
            }
          })
        }
        next()
      }
      else {
        res.status(401).json({
          status: 401,
          result:{
            mes: "Email Id Incorect"
          }
        })
        next()
      }

    })
    .catch(err => {
      res.data = { err }
      next()
    })
}


function userDetails(req, res, next) {

  User.userDetails()
    .then((result) => {
      res.status(200).json({
        status: 200,
        result:{
          mes: "User List",
          list: result
        }
      })
    }).catch(err => {
      res.data = { err }
      return res;
    })
}


function userUpdate(req, res, next) {
  console.log('userid ', req.params.user_id);
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

  User.userUpdate(req.params.user_id, payload)
    .then((result) => {
      res.status(200).json({
        status: 200,
        result:{
          mes: "Update User Values",
          list: result
        }
      })
    }).catch(err => {
      res.data = { err }
      return res;
    })
}

module.exports = {
  ragister,
  login,
  userDetails,
  userUpdate
}