const express = require('express');
const loginController = require('../controllers/loginController.js');

const router = express.Router();

//GET
router.get('/api/users', loginController.getAll)

//POST
router.post('/api/login', loginController.doLogin);
router.post('/api/user', loginController.insertUser);

//DELETE
router.delete('/api/user/:id', loginController.deleteUser);

module.exports = router;