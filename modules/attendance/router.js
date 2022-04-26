const router = require('express').Router()
const attendanceController = require("./controller")
const auth = require("../../middlewares/authorize")

// Mark punch in by the user
router.post('/punch_in',auth(1),attendanceController.punchIn);
// Mark punch out by the user
router.put('/punch_out/',auth(1),attendanceController.punchOut);

// this web service is use to get the user dashboard data.
router.get('/list/:user_id',auth(1),attendanceController.attendanceList);


router.get('/listV2/:user_id',auth(2),attendanceController.attendanceListV2)

module.exports = router;
