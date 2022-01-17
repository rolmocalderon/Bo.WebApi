const express = require('express');
const router = express.Router();
const pickups = require('../services/pickups');

/* GET programming languages. */
router.get('/', async function(req, res, next) {
  try {
        res.json(await pickups.getMultiple());
  } catch (err) {
        console.error(`Error while getting pickups `, err.message);
        next(err);
  }
});

module.exports = router;