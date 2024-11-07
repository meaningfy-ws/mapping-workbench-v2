import { serve } from "bun";
import { FlureeClient } from "@fluree/fluree-client";

const client = new FlureeClient({
  url: "http://localhost:58090" // Updated Fluree database URL
});

const server = serve({
  port: 3000,
  async fetch(req: Request): Promise<Response> {
    try {
      const query = await req.json();
      const response = await client.query(query);
      return new Response(JSON.stringify(response), { status: 200 });
    } catch (error) {
      return new Response("Error querying Fluree", { status: 500 });
    }
  },
});

console.log("Server is running at http://localhost:3000");
