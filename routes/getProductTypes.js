const express = require('express');
const router = express.Router();
const products = require('../services/products');

router.get('/', async function(req, res, next){
    try{
        res.json(await products.getProductTypes());
    }catch(err){

    }
});

module.exports = router;