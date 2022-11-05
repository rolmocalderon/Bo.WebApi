const express = require('express');
const router = express.Router();
const pickups = require('../services/pickups');

router.get('/', async function(req, res, next){
    try{
        res.json(await pickups.getTopPickups(req.query.cityId));
    }catch(err){

    }
});

module.exports = router;