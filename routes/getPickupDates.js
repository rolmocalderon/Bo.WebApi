const express = require('express');
const router = express.Router();
const pickups = require('../services/pickups');

router.get('/', async function(req, res, next){
    try{
        res.json(await pickups.getPickupDates(req.query.pickupName));
    }catch(err){

    }
});

module.exports = router;