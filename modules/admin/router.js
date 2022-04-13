const router = require('express').Router()
const adminController = require("./controller")
const auth = require("../../middlewares/authorize")

router.get('/dashboard_total/:user_id',auth(1),adminController.adminTotal);

module.exports = router;