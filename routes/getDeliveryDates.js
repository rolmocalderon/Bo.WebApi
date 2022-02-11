const express = require('express');
const router = express.Router();
const deliveries = require('../services/deliveries');

router.get('/', async function(req, res, next){
    try{
        res.json(await deliveries.getDeliveryDates(req.query.pickupName));
    }catch(err){

    }
});

module.exports = router;