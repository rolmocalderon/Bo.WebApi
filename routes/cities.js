const express = require('express');
const citiesController = require('../controllers/citiesController.js');
const auth = require("../middleware/auth");
const router = express.Router();

//GET
router.get('/api/getCities', auth, citiesController.getAll);

//POST
router.post('/api/insertCity', auth, citiesController.insertCity);
router.post('/api/deleteCity', auth, citiesController.deleteCity);

module.exports = router;