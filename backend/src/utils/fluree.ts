import { FlureeClient } from "@fluree/fluree-client";
import dotenv from "dotenv";

dotenv.config();

const PORT = 3000;
const FLUREE_LEDGER = 'cryptids'
const FLUREE_HOST = process.env.DB_HOST || 'localhost';
const FLUREE_PORT = 58090

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

// Initialize Fluree Client
const fluree = await new FlureeClient({
  host: FLUREE_HOST,
  port: FLUREE_PORT,
  ledger: 'cryptids',
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
    return await fluree.transact(transaction);
  } catch (error) {
    throw new Error(`Transaction failed: ${(error as Error).message}`);
  }
};

// /**
//  * Get Fluree ledger information
//  * @returns Ledger info
//  */
// export const getLedgerInfo = async () => {
//   try {
//     return await fluree.ledgerInfo();
//   } catch (error) {
//     throw new Error(`Failed to fetch ledger info: ${error.message}`);
//   }
// };
