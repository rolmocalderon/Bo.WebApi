const express =  require('express');
const productsController = require('../controllers/productsController');
const router = express.Router();
const auth = require("../middleware/auth");

//GET
router.get('/api/getProducts', auth, productsController.getAll);
router.get('/api/getPickupProducts', auth, productsController.getPickupProducts);
router.get('/api/getUrgentProducts', auth, productsController.getUrgentProducts);
router.get('/api/getMeasures', auth, productsController.getMeasures);

//POST
router.post('/api/syncProductPicked', auth, productsController.syncProductPicked);
router.post('/api/updateUrgentProduct', auth, productsController.updateUrgentProduct);
router.post('/api/insertProduct', auth, productsController.insertProduct);

module.exports = router;