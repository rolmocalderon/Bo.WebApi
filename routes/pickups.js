const express = require('express');
const pickupsController = require('../controllers/pickupsController.js');
const auth = require("../middleware/auth");
const router = express.Router();

//GET
router.get('/api/getPickups', auth, pickupsController.getAll);
router.get('/api/getPickupProducts', auth, pickupsController.getPickupProducts);
router.get('/api/getPickupProductsByDate', auth, pickupsController.getPickupProductsByDate);
router.get('/api/getPickupDates', auth, pickupsController.getPickupDates);
router.get('/api/getTopPickups', auth, pickupsController.getTopPickups);

//POST
router.post('/api/insertPickup', auth, pickupsController.insertPickup);

module.exports = router;