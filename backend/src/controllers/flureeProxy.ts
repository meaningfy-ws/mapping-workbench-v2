import {Request, Response} from 'express';
import {FlureeClient} from "@fluree/fluree-client";

const FLUREE_LEDGER = process.env.FLUREE_LEDGER
const FLUREE_HOST = process.env.FLUREE_HOST
const FLUREE_PORT = parseInt(process.env.FLUREE_PORT ?? '58090')

const checkLedgerExists = async () => {
    try {
        const response = await fetch(`http://${FLUREE_HOST}:${FLUREE_PORT}/fdb/${FLUREE_LEDGER}/health`);

        if (response.ok) {
            const data = await response.json();
            return data.status === 'running'; // Check if the ledger is running
        }

        return false; // If response is not OK, ledger does not exist
    } catch (error) {
        console.error('Error checking ledger:', error);
        return false; // Handle errors gracefully
    }
};

const flureeProxy = await new FlureeClient({
    host: FLUREE_HOST,
    port: FLUREE_PORT,
    ledger: FLUREE_LEDGER,
    create: !checkLedgerExists()
}).connect()


export const putRequest =
    async (req: Request, res: Response): Promise<void> => {
        try {
            const response = await upsertLedger({...req.body});
            res.json(response);
        } catch (error) {
            res.status(500).json({error: (error as Error).message});
        }
    };


export const getRequest =
    async (req: Request, res: Response): Promise<void> => {
        try {
            const response = await queryLedger({...req.body});
            res.json(response);
        } catch (error) {
            res.status(500).json({error: (error as Error).message});
        }
    };


export const postRequest =
    async (req: Request, res: Response): Promise<void> => {
        try {
            const response = await transactLedger({...req.body});
            res.json(response);
        } catch (error) {
            res.status(500).json({error: (error as Error).message});
        }
    };


export const deleteRequest =
    async (req: Request, res: Response): Promise<void> => {
        try {
            console.log(req.body)
            const response = await deleteLedger(req.body.id);
            res.json(response);
        } catch (error) {
            res.status(500).json({error: (error as Error).message});
        }
    };

/**
 * Query the Fluree ledger
 * @param query - FlureeQL query object
 * @returns Query result
 */
const queryLedger = async (query: object) => {
    try {
        return await flureeProxy.query(query).send();
    } catch (error) {
        throw new Error(`Query failed: ${(error as Error).message}`);
    }
};

/**
 * Perform a transaction in Fluree ledger
 * @param transaction - Transaction object
 * @returns Transaction result
 */
const transactLedger = async (transaction: object) => {
    try {
        return await flureeProxy.transact(transaction).send();
    } catch (error) {
        throw new Error(`Transaction failed: ${(error as Error).message}`);
    }
};

/**
 * Perform a upsert in Fluree ledger
 * @param transaction - Transaction object
 * @returns Transaction result
 */
const upsertLedger = async (transaction: any[]) => {
    try {
        return await flureeProxy.upsert(transaction).send();
    } catch (error) {
        throw new Error(`Transaction failed: ${(error as Error).message}`);
    }
};

/**
 * Perform a delete in Fluree ledger
 * @param id - Transaction id
 * @returns Transaction result
 */
const deleteLedger = async (id: string) => {
    try {
        return await flureeProxy.delete(id).send();
    } catch (error) {
        throw new Error(`Transaction failed: ${(error as Error).message}`);
    }
};