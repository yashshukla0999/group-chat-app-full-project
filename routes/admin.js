const express = require('express');
const router = express.Router();
const authenticationForAdmin = require('../middleware/auth')
const adminController = require('../controllers/adminController');

router.post('/makeGroupAdmin',authenticationForAdmin.authenticate ,adminController.makeGroupAdmin);
router.get('/checkAdmin',authenticationForAdmin.authenticate , adminController.checkAdmin);
router.get('/getGroupAdmins', authenticationForAdmin.authenticate ,adminController.getGroupAdmins);
router.post('/makeNewAdmin', authenticationForAdmin.authenticate ,adminController.makeNewAdmin);
router.post('/removeAdmin', authenticationForAdmin.authenticate ,adminController.removeAdmin);

module.exports = router;