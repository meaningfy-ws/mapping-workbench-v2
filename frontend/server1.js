const express = require("express");
const next = require("next");
const cors = require("cors");
const {FlureeClient} = require('@fluree/fluree-client');

const dev = process.env.NODE_ENV !== "production";
const app = next({dev});
const handle = app.getRequestHandler();

const dbHost = process.env.DB_HOST || 'localhost';

app.prepare().then(() => {
  const server = express();
  server.use(cors());
  server.use(express.json());

  // Example API route in Express
  server.get("/api/hello", (req, res) => {
    res.json({message: "Hello from Express!"});
  });
  //
  // const client = new FlureeClient({
  //   host: dbHost,
  //   port: 58090,
  //   ledger: 'cryptids1',
  //   // create: true
  // }).connect();
  //
  // server.post("/api/fluree/get", async (req, res) => {
  //   try {
  //     const {ledger, query} = req.body;
  //     const response = await client.query(ledger, query);
  //     res.json(response);
  //   } catch (error) {
  //     res.status(500).json({error: error.message});
  //   }
  // });

  //   } else if (url.pathname === "/transact") {
  //     try {
  //       const transaction = req.json();
  //       if (Array.isArray(transaction)) {
  //         return new Response(JSON.stringify({error: "Request body must be a JSON object, not an array."}, null, 2), {status: 400});
  //       }
  //       const response = client.transact(transaction).send();
  //       return new Response(JSON.stringify(response, null, 2), {status: 200});
  //     } catch (error) {
  //       console.error("Error transacting with Fluree:", error);
  //       const statusCode = error.response ? error.response.status : 500;
  //       return new Response(JSON.stringify({error: `Error transacting with Fluree, HTTP status code: ${statusCode}`}, null, 2), {status: statusCode});
  //     }
  //   } else {
  //     return new Response("Not Found", {status: 404});
  //   }
  // });

// Handle all other Next.js routes
  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, () => {
    console.log("🚀 Server running at http://localhost:3000");
  })
});
