import express from "express";
import cors from "cors"
import projects from "./routes/projects.js";
import {FlureeClient} from "@fluree/fluree-client";
import authenticateUser from "./middleware/authMiddleware.js";
import {userLogin} from "./controllers/userController.js";

const port = "8080";

const app = express();

app.use(cors())
app.use(express.json())


const FLUREE_LEDGER = 'cryptids12'
const FLUREE_HOST = process.env.DB_HOST || 'localhost';
const FLUREE_PORT = 58090

const checkLedgerExists = async () => {
    try {
        const response = await fetch(`http://${FLUREE_HOST}:8090/fdb/${FLUREE_LEDGER}/health`);

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


app.get("/", (req, res) => {
    res.send("Hello World!");
    console.log("Response sent");
});

app.post('/api/login', userLogin)
app.use('/api/projects', authenticateUser, projects)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});