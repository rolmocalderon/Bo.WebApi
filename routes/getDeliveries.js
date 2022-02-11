const express = require('express');
const router = express.Router();
const deliveries = require('../services/deliveries');

/* GET programming languages. */
router.get('/', async function(req, res, next) {
  try {
        res.json(await deliveries.getMultiple(req.query.cityId));
  } catch (err) {
        console.error(`Error while getting deliveries `, err.message);
        next(err);
  }
});

module.exports = router;