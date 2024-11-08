import fetch from "node-fetch";

describe("Fluree Proxy Server", () => {
  it("should return available routes at the root endpoint", async () => {
    const response = await fetch("http://localhost:3000/");
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toEqual({
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
    });
  });

  it("should handle a valid query request", async () => {
    const query = {
      select: { '?s': ['*'] },
      where: {
        '@id': '?s',
      },
    };

    const response = await fetch("http://localhost:3000/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(query, null, 2)
    });

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toBeDefined();
    // Add more assertions based on expected data structure
  });
});
