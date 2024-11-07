import { serve } from "bun";

const server = serve({
  port: 3000,
  fetch(req: Request): Response {
    return new Response("Hello World!");
  },
});

console.log("Server is running at http://localhost:3000");
