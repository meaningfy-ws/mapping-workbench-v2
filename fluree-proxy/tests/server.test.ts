import fetch from "node-fetch";
import { v4 as uuidv4 } from 'uuid';
import { describe, it, expect } from '@jest/globals';

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

  it("should return 400 for a query request with an array body", async () => {
    const query = [
      { select: { '?s': ['*'] }, where: { '@id': '?s' } }
    ];

    const response = await fetch("http://localhost:3000/query", {
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

    const response = await fetch("http://localhost:3000/transact", {
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

  it("should handle a valid transact request", async () => {
    const transaction = {
      insert: {
        name: "Derek",
        species: "yeti",
        favorite_food: "kale"
      }
    };

    const response = await fetch("http://localhost:3000/transact", {
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

  it("should handle a valid query request with JSON-LD context", async () => {
    const query = {
      "@context": {
        "@vocab": "https://meaningfy.ws/mapping-workbench/",
        "@base": "https://meaningfy.ws/data-centric-app-demo/",      
        "mwb": "http://meaningfy.ws/mapping-workbench/",
        "schema": "http://schema.org/",
        "sh": "http://www.w3.org/ns/shacl#"
      },
      select: { '?s': ['*'] },
      where: {
        '@id': '?s',
        '@type': "mwb:Project"
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
  });

  it("should handle a valid transact request with JSON-LD context", async () => {
    const transaction = {
      "@context": {
        "@vocab": "https://meaningfy.ws/mapping-workbench/",
        "@base": "https://meaningfy.ws/data-centric-app-demo/",      
        "mwb": "http://meaningfy.ws/mapping-workbench/",
        "schema": "http://schema.org/",
        "sh": "http://www.w3.org/ns/shacl#"
      },
      insert: {
        "@id": uuidv4(),
        "@type": "mwb:Project",
        "schema:name": "Test Project"
      }
    };

    const response = await fetch("http://localhost:3000/transact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(transaction, null, 2)
    });

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.commit).toBeDefined();
  });

  it("should handle a valid policy transaction with combined data", async () => {
    const policy = {
      "@context": {
        "@vocab": "https://meaningfy.ws/mapping-workbench/",
        "@base": "https://meaningfy.ws/data-centric-app-demo/",      
        "mwb": "http://meaningfy.ws/mapping-workbench/",
        "schema": "http://schema.org/",
        "sh": "http://www.w3.org/ns/shacl#"
      },
      "insert": [
        {
          "@id": "ex:ProjectShape",
          "@type": ["sh:NodeShape"],
          "sh:targetClass": { "@id": "mwb:Project" },
          "sh:property": [
            {
              "sh:path": { "@id": "schema:name" },
              "sh:maxCount": 1
            }
          ]
        },
        {
          "@id": "test-policy-project",
          "@type": "mwb:Project",
          "schema:name": "Test Policy Project",
          "schema:description": "This is a test project for policy"
        }
      ]
    };

    const response = await fetch("http://localhost:3000/transact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(policy, null, 2)
    });

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.commit).toBeDefined();
  });

  it("should reject any transaction that violates policy constraints", async () => {
    // First create a project with ID "policy-violation-test"
    const initialTransaction = {
      "@context": {
        "@vocab": "https://meaningfy.ws/mapping-workbench/",
        "@base": "https://meaningfy.ws/data-centric-app-demo/",      
        "mwb": "http://meaningfy.ws/mapping-workbench/",
        "schema": "http://schema.org/",
        "sh": "http://www.w3.org/ns/shacl#"
      },
      insert: {
        "@id": "policy-violation-test",
        "@type": "mwb:Project",
        "schema:name": "Initial Project"
      }
    };

    await fetch("http://localhost:3000/transact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(initialTransaction, null, 2)
    });

    // Now try to update it with a duplicate ID, which should violate constraints
    const violationTransaction = {
      "@context": {
        "@vocab": "https://meaningfy.ws/mapping-workbench/",
        "@base": "https://meaningfy.ws/data-centric-app-demo/",      
        "mwb": "http://meaningfy.ws/mapping-workbench/",
        "schema": "http://schema.org/",
        "sh": "http://www.w3.org/ns/shacl#"
      },
      insert: {
        "@id": "policy-violation-test",
        "@type": "mwb:Project",
        "schema:name": "Duplicate Project"
      }
    };

    const response = await fetch("http://localhost:3000/transact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(violationTransaction, null, 2)
    });

    // The response might be 400 or 409 depending on how your server handles violations
    expect([400, 409, 500]).toContain(response.status);
    const data = await response.json();
    expect(data.error || data.message).toBeDefined();
  });
});
