import { Request, Response } from 'express';
import { Product } from '../models/product';

const products: Product[] = [
  { id: 1, name: 'Laptop', price: 1200 },
  { id: 2, name: 'Phone', price: 800 },
];

export const getAllProducts = (req: Request, res: Response): void => {
  res.json(products);
};