import fetch from "node-fetch";

async function testFlureeProxy() {
  const query = {
    // from: "cryptids",
    select: { '?s': ['*'] },
    where: {
      '@id': '?s',
    },
  };

  try {
    const response = await fetch("http://localhost:3000/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(query, null, 2)
    });

    const data = await response.json();
    console.log("Response from Fluree Proxy:", data);
  } catch (error) {
    console.error("Error testing Fluree Proxy:", error);
  }
}

testFlureeProxy();
