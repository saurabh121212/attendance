const router = require('express').Router()
const attendanceController = require("./controller")
const auth = require("../../middlewares/authorize")

// Mark punch in by the user
router.post('/punch_in',auth(1),attendanceController.punchIn);
// Mark punch out by the user
router.put('/punch_out/',auth(1),attendanceController.punchOut);

// this web service is use to get the user dashboard data.
router.get('/list/:user_id',auth(1),attendanceController.attendanceList);

// this web service is for give day wise user punchIn punchOut data
router.get('/punch_in_data/:user_id',auth(1),attendanceController.attendancePunchInPunchOut);

router.post('/listV2',auth(2),attendanceController.attendanceListV2)



router.get('/testingpost',attendanceController.attendanceListV3)


module.exports = router;
