const express =  require('express');
const measuresController = require('../controllers/measuresController');
const router = express.Router();
const auth = require("../middleware/auth");

//GET
router.get('/api/measures', auth, measuresController.getAll);

//POST
router.post('/api/measure', auth, measuresController.insertMeasure);

//DELETE
router.delete('/api/measure/:id', auth, measuresController.deleteMeasure);

module.exports = router;