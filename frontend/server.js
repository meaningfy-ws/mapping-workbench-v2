const express = require("express");
const next = require("next");
const cors = require("cors");
const { FlureeClient } = require("@fluree/fluree-client");

const dev = process.env.NODE_ENV !== "production";
const app = next({dev});
const handle = app.getRequestHandler();
// const app = express();
const PORT = 3000;
const fluree = new FlureeClient({ host: "http://localhost:8090" ,ledger:'12345'});

app.prepare().then(() => {
  const server = express();
  server.use(cors());
  server.use(express.json());

// ✅ Query Data Route
  server.post("/query", async (req, res) => {
    try {
      const {query} = req.body;
      const response = await fluree.query(query);
      res.json(response);
    } catch (error) {
      res.status(500).json({error: error.message});
    }
  });

// Start the server
  server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });

})
