import {Request, Response} from 'express';
import {Product} from '../models/product.js';
import {queryLedger} from "../utils/fluree.js";


export const getAllProducts =
    async (req: Request, res: Response): Promise<void> => {
        try {

            // Query FlureeDB for products
            // const query = {select: ['*'], from: 'product'};
            const query = {
                select: {'?s': ['*']},
                where: {
                    '@id': '?s',
                    '@type': 'projects',
                },
            }

            const products: Product[] = await queryLedger(query);

            res.json(products);
        } catch (error) {
            res.status(500).json({error: 'Failed to fetch products'});
        }
    };

const products: Product[] = [
    {id: 1, name: 'Laptop', price: 1200},
    {id: 2, name: 'Phone', price: 800},
];

export const getAllProducts1 = (req: Request, res: Response): void => {
    res.json(products);
};