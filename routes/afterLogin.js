const express = require('express');
const router = express.Router();
const afterLoginAuth = require('../middleware/auth')

const afterLoginController = require('../controllers/afterLogin')

router.get('/views/afterLogin.html',afterLoginController.showForm)
router.post('/send-message', afterLoginController.chatMessage)
router.get('/send-message', afterLoginController.getChatMessage)


module.exports = router