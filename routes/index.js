const express = require('express');
const router = express.Router();

const signupController = require('../controllers/signup')

router.get('/',signupController.showForm);
router.post('/signUp',signupController.postUser);

module.exports=router;