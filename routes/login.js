const express = require('express');
const loginController = require('../controllers/loginController.js');

const router = express.Router();

//POST
router.post('/api/login', loginController.doLogin);

module.exports = router;