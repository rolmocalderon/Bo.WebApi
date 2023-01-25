import express from "express";
import {citiesController} from '../controllers/citiesController.js';

const router = express.Router();

//GET
router.get('/api/getCities', citiesController.getAll);

//POST
router.post('/api/insertCity', citiesController.insertCity);

export default router;