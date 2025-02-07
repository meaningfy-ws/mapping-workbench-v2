import fetch from "node-fetch";

describe("Fluree Proxy Server", () => {
  it("should return available routes at the root endpoint", async () => {
    const response = await fetch("http://localhost:8000/");
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

  it("should return 400 for a query request with an array body", async () => {
    const query = [
      { select: { '?s': ['*'] }, where: { '@id': '?s' } }
    ];

    const response = await fetch("http://localhost:8000/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(query, null, 2)
    });

    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toBe("Request body must be a JSON object, not an array.");
  });

  it("should return 400 for a transact request with an array body", async () => {
    const transaction = [
      { insert: { name: "Derek", species: "yeti", favorite_food: "kale" } }
    ];

    const response = await fetch("http://localhost:8000/transact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(transaction, null, 2)
    });

    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toBe("Request body must be a JSON object, not an array.");
  });

  it("should handle a valid query request", async () => {
    const query = {
      select: { '?s': ['*'] },
      where: {
        '@id': '?s',
      },
    };

    const response = await fetch("http://localhost:8000/query", {
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

  it("should handle a valid transact request", async () => {
    const transaction = {
      insert: {
        name: "Derek",
        species: "yeti",
        favorite_food: "kale"
      }
    };

    const response = await fetch("http://localhost:8000/transact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(transaction, null, 2)
    });

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.commit).toBeDefined();
    // Add more assertions based on expected data structure
  });
