import express from "express"
import next from "next"
import cors from "cors"
import {FlureeClient} from "@fluree/fluree-client"


const PORT = 3000;
const FLUREE_HOST = process.env.DB_HOST || 'localhost';
const FLUREE_PORT = 58090

console.log('here fluree must start')

const fluree = await new FlureeClient({
  host: FLUREE_HOST,
  port: FLUREE_PORT,
  ledger: 'cryptids9',
  create: true
}).connect();

console.log("FLUREE", fluree)

const dev = process.env.NODE_ENV !== "production";
const app = next({dev});
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.use(cors());
  server.use(express.json());


  // Example API route in Express
  server.get("/api/hello", (req, res) => {
    res.json({message: "Hello from Express!"});
  });

  server.post("/api/fluree/get", async (req, res) => {
    try {
      const query = req.body;
      console.log(query,req.body)
      const response = await fluree.query(query).send();
      console.log(response)
      res.json(response);
    } catch (error) {
      res.status(500).json({error: error.message});
    }
  });

  server.post("/api/fluree/add", async (req, res) => {
    try {
      const query = req.body;
      const response = await fluree.transact(query).send();
      console.log('response of transaction',response)
      res.json(response);
    } catch (error) {
      res.status(500).json({error: error.message});
    }
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  })
});
