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
        res.status(402).json({
          status: 402,
          result: {
            mes: "This Email is already Exists in the system"
          }
        })
      }
      else {
        res.status(200).json({
          status: 200,
          result: {
            mes: "New Employee added successfully"
          }
        })
      }
    })
    .catch(err => {
      console.log(err);
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
      if (result) {
        // Check Password 
        if (bcrypt.compareSync(payload.password, result.password)) {

          // generate JWT token
          let token = generateJWT({ user_id: result.user_id, user_type: result.user_type }, process.env.JWT_SECRET);

          //let returnValue = {token, ..};
          // update user with JWT token
          User.updateToken(token, result.user_id).
            then(() => {
                User.infoV2(result.user_id).
                  then(result1 => {
                    res.status(200).json({
                      status: 200,
                      result: {
                        mes: "Login Done",
                        list: result1
                      }
                    })
                  });
              });
        }

        else {
          res.status(401).json({
            status: 401,
            result: {
              mes: "You have enter incorect password"
            }
          })
        }
      }
      else {
        res.status(401).json({
          status: 401,
          result: {
            mes: "Email Id Incorect"
          }
        })
      }

    })
    .catch(err => {
      console.log(err);
      res.data = { err }
    })
}


function userDetails(req, res, next) {

  User.userDetails()
    .then((result) => {
      res.status(200).json({
        status: 200,
        result: {
          mes: "User List",
          list: result
        }
      })
    }).catch(err => {
      res.data = { err }
      return res;
    })
}


function userDetailsById(req, res, next) {
  User.infoV2(req.params.user_id)
    .then((result) => {
      res.status(200).json({
        status: 200,
        result: {
          mes: "User Details",
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

  //payload.password = bcrypt.hashSync(payload.password, 10);
  
  User.userUpdate(req.params.user_id, payload)
    .then((result) => {
      res.status(200).json({
        status: 200,
        result: {
          mes: "Employee details update successfully",
          list: result
        }
      })
    }).catch(err => {
      res.data = { err }
      return res;
    })
}



function userChangePassword(req, res, next) {
  payload = req.body;

  payload.password = bcrypt.hashSync(payload.password, 10);
  
  User.userChangePassword(payload)
    .then((result) => {
      res.status(200).json({
        status: 200,
        result: {
          mes: "Employee Password update successfully",
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
  userUpdate,
  userDetailsById,
  userChangePassword
}