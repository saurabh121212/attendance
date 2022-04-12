const router = require('express').Router()
const holidaysController = require("./controller")
const auth = require("../../middlewares/authorize")

router.post('/create',auth(1),holidaysController.holidaysCreate);
router.get('/list',auth(1),holidaysController.holidaysList);
router.put('/update/:holiday_id',auth(1),holidaysController.holidaysUpdate);

module.exports = router;