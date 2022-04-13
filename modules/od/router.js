
const router = require('express').Router()
const odController = require("./controller")
const auth = require("../../middlewares/authorize")

// this web service is use to send od application. 
router.post('/od_application',auth(1),odController.odApplication);

// this web service is use to get the list of Od applied by user.
router.get('/applied_od/:apply_by_id',auth(1),odController.applayOd);


// This web service is use to show the list of OD requests to the manager.
router.get('/od_request/:send_to_id',auth(1),odController.odRequest);

router.put('/od_approve_reject/:od_id',auth(1),odController.odApproveReject);


module.exports = router;