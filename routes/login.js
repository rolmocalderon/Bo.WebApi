import express from "express";
import {loginController} from '../controllers/loginController.js';

const router = express.Router();

//POST
router.post('/api/login', loginController.doLogin);

export default router;