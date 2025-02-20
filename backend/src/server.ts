import express from "express";
import cors from "cors"
import dotenv from 'dotenv'
import {FlureeClient} from "@fluree/fluree-client";

import projects from "./routes/projects.js";
import authenticateUser from "./middleware/authMiddleware.js";
import {decodeJWT, userLogin, userRegister} from "./controllers/userController.js";

dotenv.config()

const PORT = process.env.MW_BACKEND_PORT;

const app = express();

app.use(cors())
app.use(express.json())


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

const fluree = await new FlureeClient({
    host: FLUREE_HOST,
    port: FLUREE_PORT,
    ledger: FLUREE_LEDGER,
    create: !checkLedgerExists()
}).connect()

/**
 * Query the Fluree ledger
 * @param query - FlureeQL query object
 * @returns Query result
 */
export const queryLedger = async (query: object) => {
    try {
        return await fluree.query(query).send();
    } catch (error) {
        throw new Error(`Query failed: ${(error as Error).message}`);
    }
};

/**
 * Perform a transaction in Fluree ledger
 * @param transaction - Transaction object
 * @returns Transaction result
 */
export const transactLedger = async (transaction: object) => {
    try {
        return await fluree.transact(transaction).send();
    } catch (error) {
        throw new Error(`Transaction failed: ${(error as Error).message}`);
    }
};

app.post('/api/me', decodeJWT)
app.post('/api/login', userLogin)
app.post('/api/register', userRegister)
app.use('/api/projects', authenticateUser, projects)

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});