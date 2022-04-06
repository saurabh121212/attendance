const router = require('express').Router()
const attendanceController = require("./controller")
const auth = require("../../middlewares/authorize")

router.post('/punch_in',auth(1),attendanceController.punchIn);
router.put('/punch_out/:attendance_id',auth(1),attendanceController.punchOut);


module.exports = router;
