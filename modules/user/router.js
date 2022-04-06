const router = require('express').Router()
const userController = require("./controller")
const auth = require("../../middlewares/authorize")


//const auth = require(__middlewares + "/authorize")

router.post('/ragister',auth(1),userController.ragister);
router.post('/login',userController.login);
router.get('/list',auth(1),userController.userDetails);
router.put('/update/:user_id',auth(1),userController.userUpdate);



module.exports = router;
