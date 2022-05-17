const router = require('express').Router()
const leaveTypeController = require("./controller")
const auth = require("../../middlewares/authorize")


// Create Leave Type
router.post('/create',auth(1),leaveTypeController.leaveTypeCreate);

// List of Leave Type by Year
router.get('/list/:year',auth(1),leaveTypeController.leaveTypelist);

// Update Leave Type values
router.put('/update/:leave_type_id',auth(1),leaveTypeController.leaveTypeupdate);


router.get('/anual_leave_count/:user_id',auth(1),leaveTypeController.anualLeaveCount);


module.exports = router;
