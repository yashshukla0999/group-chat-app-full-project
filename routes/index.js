const express = require('express');
const router = express.Router();

const signupController = require('../controllers/signup')

router.get('/',signupController.showForm);
router.post('/signUp',signupController.postUser);
router.post('/login',signupController.postUserLogin)

module.exports=router;