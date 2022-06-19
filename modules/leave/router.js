const router = require('express').Router()
const leaveController = require("./controller")
const auth = require("../../middlewares/authorize")


// this web service is use to send leave application. 
router.post('/leave_application',auth(1),leaveController.leaveApplication);

// this web service is use to get the list of leave applied by user.
router.get('/applied_leave/:leave_apply_by_id',auth(1),leaveController.applayLeave);

// This web service is use to show the list of leave requests to the manager.
router.get('/leave_request/:assigned_to_id',auth(1),leaveController.leaveRequest);

// This web service is use to aprprove reject the leave of use.
router.put('/leave_approve_reject/:leave_id',auth(1),leaveController.leaveApproveReject);

// this web service is use to count the total leave taken by the user in a year.
router.post('/leave_count',auth(1),leaveController.leaveCount);

router.post('/leave_count_annual',auth(1),leaveController.leaveCountAnnual);


module.exports = router;