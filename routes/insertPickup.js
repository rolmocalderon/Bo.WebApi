const express = require('express');
const router = express.Router();
const pickups = require('../services/pickups');

router.post('/', async function(req, res, next) {
  try {
        res.json(await pickups.insert(req.query));
  } catch (err) {
        console.error(`Error while loging `, err.message);
        next(err);
  }
});

module.exports = router;