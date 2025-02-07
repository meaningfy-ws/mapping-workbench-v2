import { serve } from "bun";
import { FlureeClient } from "@fluree/fluree-client";

const dbHost = process.env.DB_HOST || 'localhost';

console.log('im in')

const client = await new FlureeClient({
  host: dbHost,
  port: 58090,
  ledger: 'fluree-jld/38702809297855',
  create: true
}).connect();

console.log('connected')

const server = serve({
  port: 8000,
  async fetch(req: Request): Promise<Response> {
    const url = new URL(req.url);
    if (url.pathname === "/") {
      const routes = {
        availableRoutes: [
          {
            path: "/query",
            description: "POST request in FlureeQL for read (SELECT) queries"
          },
          {
            path: "/transact",
            description: "POST request in FlureeQL for write (INSERT) queries)"
          }
        ]
      };
      return new Response(JSON.stringify(routes, null, 2), { status: 200, headers: { "Content-Type": "application/json" } });
    } else if (url.pathname === "/query") {
      try {
        const query = await req.json();
        if (Array.isArray(query)) {
          return new Response(JSON.stringify({ error: "Request body must be a JSON object, not an array." }, null, 2), { status: 400 });
        }
        const response = await client.query(query).send();
        return new Response(JSON.stringify(response, null, 2), { status: 200 });
      } catch (error) {
        console.error("Error querying Fluree:", error);
        const statusCode = error.response ? error.response.status : 500;
        return new Response(JSON.stringify({ error: `Error querying Fluree, HTTP status code: ${statusCode}` }, null, 2), { status: statusCode });
      }
    } else if (url.pathname === "/transact") {
      try {
        const transaction = await req.json();
        if (Array.isArray(transaction)) {
          return new Response(JSON.stringify({ error: "Request body must be a JSON object, not an array." }, null, 2), { status: 400 });
        }
        const response = await client.transact(transaction).send();
        return new Response(JSON.stringify(response, null, 2), { status: 200 });
      } catch (error) {
        console.error("Error transacting with Fluree:", error);
        const statusCode = error.response ? error.response.status : 500;
        return new Response(JSON.stringify({ error: `Error transacting with Fluree, HTTP status code: ${statusCode}` }, null, 2), { status: statusCode });
      }
    } else {
      return new Response("Not Found", { status: 404 });
    }
  },
});

console.log("Server is running at http://localhost:8000");
