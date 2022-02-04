const express = require('express');
const router = express.Router();
const cities = require('../services/cities');

router.post('/', async function(req, res, next) {
  try {
        res.json(await cities.insert(req.body));
  } catch (err) {
        console.error(`Error while loging `, err.message);
        next(err);
  }
});

module.exports = router;