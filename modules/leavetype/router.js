const router = require('express').Router()
const leaveTypeController = require("./controller")
const auth = require("../../middlewares/authorize")


router.post('/create',auth(1),leaveTypeController.leaveTypeCreate);
router.get('/list/:year',auth(1),leaveTypeController.leaveTypelist);
router.put('/update/:leave_type_id',auth(1),leaveTypeController.leaveTypeupdate);



module.exports = router;
