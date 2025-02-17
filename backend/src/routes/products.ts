import express from 'express';
import { getAllProducts } from '../controllers/productController.js';

const router = express.Router();

router.post('/', getAllProducts);

export default router;