const router = require('express').Router()
const userController = require("./controller")
const auth = require("../../middlewares/authorize")

//const auth = require(__middlewares + "/authorize")

// This web service is use to add new user in the system. 
router.post('/ragister',auth(1),userController.ragister);

// This web service is use to login Admin and User/Employee
router.post('/login',userController.login);

// This web service is use to get the user list which are in the system. 
router.get('/list',auth(1),userController.userDetails);

// This Web service is use to update the values of the user.
router.put('/update/:user_id',auth(1),userController.userUpdate);



module.exports = router;
