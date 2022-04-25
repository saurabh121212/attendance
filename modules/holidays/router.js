const router = require('express').Router()
const holidaysController = require("./controller")
const auth = require("../../middlewares/authorize")

// create national holidays
router.post('/create',auth(1),holidaysController.holidaysCreate);
// list of national holidays
router.get('/list',auth(1),holidaysController.holidaysList);
// update national holidays
router.put('/update/:holiday_id',auth(1),holidaysController.holidaysUpdate);

module.exports = router;