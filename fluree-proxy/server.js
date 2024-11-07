const { serve } = require("bun");

const server = serve({
  port: 3000,
  fetch(req) {
    return new Response("Hello World!");
  },
});

console.log("Server is running at http://localhost:3000");
