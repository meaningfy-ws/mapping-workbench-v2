import {Request, Response} from 'express';
import {queryLedger, transactLedger} from "../utils/flureeProxy.js";
import {Project} from "../models/project.js";


export const getAllProjects =
    async (req: Request, res: Response): Promise<void> => {
        try {
            const query = {
                select: {'?s': ['*']},
                where: {
                    '@id': '?s',
                    '@type': 'projects',
                },
            }

            const projects: Project[] = await queryLedger(query);
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

export const updateProject =
    async (req: Request, res: Response): Promise<void> => {
        const {'@id':id,...rest} = req.body
        try {
            const response = await transactLedger({
                delete: {'@id': id, '?p0': '?o0'},
                where: {'@id': id, '?p0': '?o0'},
            });
            if (response) {
                const add_response = await transactLedger({insert: {...rest, '@type': 'projects'}});
                res.json(add_response);
            }
        } catch (error) {
            res.status(500).json({error: (error as Error).message});
        }
    }