import express from "express"
import cors from "cors"
import {FlureeClient} from "@fluree/fluree-client"


const PORT = 3000;
const FLUREE_LEDGER = 'cryptids'
const FLUREE_HOST = process.env.DB_HOST || 'localhost';
const FLUREE_PORT = 58090

console.log('STARTING FLUREE')

const checkLedgerExists = async () => {
    try {
        const response = await fetch(`${FLUREE_HOST}/fdb/${FLUREE_LEDGER}/health`);

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
    ledger: 'cryptids12',
    create: !checkLedgerExists()
}).connect();

console.log("FLUREE", fluree)


const server = express();
server.use(cors());
server.use(express.json());


server.post("/api/fluree/query", async (req, res) => {
    try {
        const query = req.body;
        const response = await fluree.query(query).send();
        res.json(response);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

server.post("/api/fluree/transact", async (req, res) => {
    try {
        const query = req.body;
        const response = await fluree.transact(query).send();
        res.json(response);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});
