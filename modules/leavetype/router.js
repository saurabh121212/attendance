const router = require('express').Router()
const leaveTypeController = require("./controller")


router.post('/create',leaveTypeController.leaveTypeCreate);
router.get('/list',leaveTypeController.leaveTypelist);
router.put('/update/:leave_type_id',leaveTypeController.leaveTypeupdate);





module.exports = router;
