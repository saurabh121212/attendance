const { user } = require('../../models');
const { Op, Sequelize } = require("sequelize");

module.exports = {
    ragister,
    login,
    userDetails,
    userUpdate,
    updateToken,
    info,
    infoV2
}

async function ragister(payload = {}) {
  return user.findOrCreate({
    where:{
      email_id:payload.email_id
    },
    defaults: payload
    
  })
    .then((result) => {
      return result;
     })
  }

 async function login(payload = {})
 {
   return user.findOne({
    where:{
       email_id: payload.email_id
     }
   })
   .then((result)=>{
     return result;
   }) 
 } 


 async function userDetails(){
   return user.findAll({
    attributes: {exclude:['password','otp','year','token']},
    where:{
      del_status:1
    }
   }).then((result)=>{
     return result;
   })
 }


 async function userUpdate(user_id,payload){
   return user.update(
     {
       user_name: payload.user_name,
       designation: payload.designation,
       date_of_joining: payload.date_of_joining,
       manager_id:payload.manager_id,
       manager_name:payload.manager_name,
       gender: payload.gender,
       phone_number: payload.phone_number,
       del_status:payload.del_status,
       email_id:payload.email_id,
       password:payload.password
    },  
     {
     where:{
       user_id:user_id
     }
      }).then((result)=>{
        return result
      })
    
 }


 async function updateToken(token, id) {
  return user.update({
      token: token
    },
    {
    where: { user_id: id},

  })
    .then(result => {
      return result
    })
}


async function info(values = {}) {
  return user.findOne({
    where: { user_id: values.id },
  })
    .then(result => {
      return result
    })
}


async function infoV2(values) {
  return user.findOne({
    attributes: {exclude:['password','otp']},
    where: { user_id: values},
  })
    .then(result => {
      return result
    })
}