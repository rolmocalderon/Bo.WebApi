const express = require('express');
const router = express.Router();
const pickups = require('../services/pickups');

router.get('/', async function(req, res, next){
    try{
        console.log(req.query);
        res.json(await pickups.getPickupProducts(req.query.placeId, req.query.date));
    }catch(err){

    }
});

module.exports = router;