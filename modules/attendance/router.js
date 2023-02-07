const router = require('express').Router()
const attendanceController = require("./controller")
const auth = require("../../middlewares/authorize")

// Mark punch in by the user
router.post('/punch_in',auth(1),attendanceController.punchIn);
// Mark punch out by the user
router.put('/punch_out/',auth(1),attendanceController.punchOut);

// this web service is use to get the user dashboard data.
router.post('/list',auth(1),attendanceController.attendanceList);

// this web service is for give day wise user punchIn punchOut data
router.post('/punch_in_data',auth(1),attendanceController.attendancePunchInPunchOut);

router.post('/listV2',auth(2),attendanceController.attendanceListV2);

// this web service is use for getting current date employee details. 
router.post('/single_day_emp_details',auth(2),attendanceController.singleDayEmpDetails)


router.get('/testingpost',attendanceController.attendanceListV3)

module.exports = router;
