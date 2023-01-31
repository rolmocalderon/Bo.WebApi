const express =  require('express');
const productsController = require('../controllers/productsController');
const router = express.Router();
const auth = require("../middleware/auth");

//GET
router.get('/api/products', auth, productsController.getAll);
router.get('/api/pickupProducts', auth, productsController.getPickupProducts);
router.get('/api/urgentProducts', auth, productsController.getUrgentProducts);
router.get('/api/measures', auth, productsController.getMeasures);

//POST
router.post('/api/syncProductPicked', auth, productsController.syncProductPicked);
router.post('/api/updateUrgentProduct', auth, productsController.updateUrgentProduct);
router.post('/api/product', auth, productsController.insertProduct);

//DELETE
router.delete('/api/product/:id', auth, productsController.deleteProduct);

module.exports = router;