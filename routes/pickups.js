const express = require('express');
const pickupsController = require('../controllers/pickupsController.js');

const router = express.Router();

//GET
router.get('/api/getPickups', pickupsController.getAll);
router.get('/api/getPickupProducts', pickupsController.getPickupProducts);
router.get('/api/getPickupProductsByDate', pickupsController.getPickupProductsByDate);
router.get('/api/getPickupDates', pickupsController.getPickupDates);
router.get('/api/getTopPickups', pickupsController.getTopPickups);

//POST
router.post('/api/insertPickup', pickupsController.insertPickup);

module.exports = router;