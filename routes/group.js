const express = require('express');
const router = express.Router();

const userAuthentication = require('../middleware/auth')

const groupController = require('../controllers/groupControl')

router.post('/createGroup',userAuthentication.authenticate,groupController.createGroup);

router.get('/getGroup',userAuthentication.authenticate,groupController.getGroups)

router.get('/getGroupMessages',userAuthentication.authenticate,groupController.getGroupMessages)
router.post('/sendfile/:groupId',userAuthentication.authenticate,msgController.uploadFile);

module.exports = router;
