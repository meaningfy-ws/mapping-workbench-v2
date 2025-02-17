import {Request, Response} from 'express';
import {queryLedger, transactLedger} from "../utils/fluree.js";
import {Project} from "../models/project.js";


export const getAllProjects =
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

            const projects: Project[] = await queryLedger(query);
            console.log(projects)
            res.json(projects);
        } catch (error) {
            res.status(500).json({error: 'Failed to fetch projects'});
        }
    };


export const addProject =
    async (req: Request, res: Response): Promise<void> => {
        try {
            const response = await transactLedger({insert: {...req.body, '@type': 'projects'}});
            res.json(response);
        } catch (error) {
            res.status(500).json({error: (error as Error).message});
        }
    };


export const deleteProject =
    async (req: Request, res: Response): Promise<void> => {
        const {id} = req.body
        console.log('in delete', id)
        try {
            const response = await transactLedger({
                delete: {'@id': id, '?p0': '?o0'},
                where: {'@id': id, '?p0': '?o0'},
            },);
            res.json(response);
        } catch (error) {
            res.status(500).json({error: (error as Error).message});
        }
    };