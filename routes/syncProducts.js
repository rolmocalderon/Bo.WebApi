const express = require('express');
const router = express.Router();
const products = require('../services/products');

router.post('/', async function(req, res, next){
    try{
        let response = await products.syncData(req.body);
        res.json(response);
    }catch(err){
        return res.status(400).send({
            message: 'This is an error!'
        });
    }
});

module.exports = router;