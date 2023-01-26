const express = require('express');
const citiesController = require('../controllers/citiesController.js');

const router = express.Router();

//GET
router.get('/api/getCities', citiesController.getAll);

//POST
router.post('/api/insertCity', citiesController.insertCity);

module.exports = router;