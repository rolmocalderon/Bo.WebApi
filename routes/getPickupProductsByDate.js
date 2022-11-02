const express = require('express');
const router = express.Router();
const pickups = require('../services/pickups');

router.get('/', async function(req, res, next){
    try{
        res.json(await pickups.getPickupProductsByDate(req.query));
    }catch(err){

    }
});

module.exports = router;