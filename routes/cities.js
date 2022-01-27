const express = require('express');
const router = express.Router();
const cities = require('../services/cities');

router.get('/', async function(req, res, next){
    try{
        res.json(await cities.getMultiple());
    }catch(err){

    }
});

module.exports = router;