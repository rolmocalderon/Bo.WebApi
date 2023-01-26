const express =  require('express');
const productsController = require('../controllers/productsController');
const router = express.Router();

//GET
router.get('/api/getProducts', productsController.getAll);
router.get('/api/getPickupProducts', productsController.getPickupProducts);
router.get('/api/getUrgentProducts', productsController.getUrgentProducts);
router.get('/api/getMeasures', productsController.getMeasures);

//POST
router.post('/api/syncProductPicked', productsController.syncProductPicked);
router.post('/api/updateUrgentProduct', productsController.updateUrgentProduct);
router.post('/api/insertProduct', productsController.insertProduct);

module.exports = router;