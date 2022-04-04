const router = require('express').Router()
const userController = require("./controller")


//const auth = require(__middlewares + "/authorize")

router.post('/ragister',userController.ragister);
router.post('/login',userController.login);
router.get('/list',userController.userDetails);
router.put('/update/:user_id',userController.userUpdate);



module.exports = router;
