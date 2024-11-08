import { serve } from "bun";
import { FlureeClient } from "@fluree/fluree-client";

const client = await new FlureeClient({
  host: 'localhost',
  port: 58090,
  ledger: 'cryptids',
  // create: true
}).connect();

const server = serve({
  port: 3000,
  async fetch(req: Request): Promise<Response> {
    try {
      const query = await req.json();
      const response = await client.query(query).send();
      return new Response(JSON.stringify(response), { status: 200 });
    } catch (error) {
      console.error("Error querying Fluree:", error);
      const statusCode = error.response ? error.response.status : 500;
      return new Response(JSON.stringify({ error: `Error querying Fluree, HTTP status code: ${statusCode}` }), { status: statusCode });
    }
  },
});

console.log("Server is running at http://localhost:3000");
