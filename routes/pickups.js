const express = require('express');
const pickupsController = require('../controllers/pickupsController.js');
const auth = require("../middleware/auth");
const router = express.Router();

//GET
router.get('/api/pickups', auth, pickupsController.getAll);
router.get('/api/pickupProducts/:pickupId', auth, pickupsController.getPickupProducts);
router.get('/api/pickupProductsByDate', auth, pickupsController.getPickupProductsByDate);
router.get('/api/pickupDates', auth, pickupsController.getPickupDates);
router.get('/api/topPickups', auth, pickupsController.getTopPickups);

//POST
router.post('/api/pickup', auth, pickupsController.insertPickup);

//DELETE
router.delete('/api/pickup/:id', auth, pickupsController.deletePickup);

module.exports = router;