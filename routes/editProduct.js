const express = require('express');
const router = express.Router();
const products = require('../services/products');

router.post('/', async function(req, res, next){
    try{
        let response = await products.editProduct(req);
        res.json(response);
    }catch(err){
        console.log("error while editing product", err);
    }
});

module.exports = router;