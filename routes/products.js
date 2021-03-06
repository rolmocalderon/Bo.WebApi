const express = require('express');
const router = express.Router();
const pickups = require('../services/pickups');

router.get('/', async function(req, res, next) {
  try {
        res.json(await pickups.getPickupProducts(req.query));
  } catch (err) {
        console.error(`Error while getting products `, err.message);
        next(err);
  }
});

module.exports = router;