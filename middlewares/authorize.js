const jsonwebtoken = require("jsonwebtoken")
const userInfo = require("../modules/user/DAO").info;

module.exports = function (...userTypes) {
  return async function (req, res, next) {
  
    let jwt = req.header("authorization");
  
    if(!jwt) {
      req.user = {
          role: "public"
      }
    }
    else {
      try {
        console.log(jwt);
        let data = jsonwebtoken.verify(jwt, process.env.JWT_SECRET);
        req.user = await userInfo({id: data.user_id});
        //console.log("USER:", req.user.id, req.user.full_name, req.user.email)
       // req.user.foreignModel = ["customer", "admin"].includes(req.user.role) ? req.user.role+'s' : 'shops';
      } catch(err) {
        console.log(err)
        return res.status(402).json({
          msg: "Invalid token"
        })
      }
    }
    
    next();

    // if(userTypes.includes(req.user.user_type) || userTypes[0]==="all" && req.user.user_type!="public") {
    //   next();
    // } else {
    //   res.status(401).json({
    //     msg: "Access denied, user has no permission"
    //   })
    // }
  }
} 