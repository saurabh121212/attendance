const { user } = require('../../models');
const { Op, Sequelize } = require("sequelize");

module.exports = {
    ragister,
    login,
    userDetails,
    userUpdate
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
    attributes: {exclude:['password','otp','year']}
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
       gender: payload.gender,
       phone_number: payload.phone_number,
    },  
     {
     where:{
       user_id:user_id
     }
      }).then((result)=>{
        return result
      })
    
 }