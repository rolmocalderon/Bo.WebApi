const express = require('express');
const router = express.Router();
const login = require('../services/login');

router.get('/', async function(req, res, next) {
  try {
        res.json(await login.getSingle(req.query));
  } catch (err) {
        console.error(`Error while loging `, err.message);
        next(err);
  }
});

module.exports = router;