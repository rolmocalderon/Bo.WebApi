const express = require('express');
const citiesController = require('../controllers/citiesController.js');
const auth = require("../middleware/auth");
const router = express.Router();

//GET
router.get('/api/cities', auth, citiesController.getAll);

//POST
router.post('/api/city', auth, citiesController.insertCity);

//DELETE
router.delete('/api/city/:id', auth, citiesController.deleteCity);

module.exports = router;