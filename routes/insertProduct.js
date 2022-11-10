const express = require('express');
const router = express.Router();
const products = require('../services/products');

router.post('/', async function(req, res, next) {
  try {
        res.json(await products.insert(req.body));
  } catch (err) {
        console.error(`Error while loging `, err.message);
        next(err);
  }
});

module.exports = router;