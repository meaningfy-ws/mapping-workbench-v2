import fetch from "node-fetch";

async function testFlureeProxy() {
  const query = {
    select: ["*"],
    from: "collection"
  };

  try {
    const response = await fetch("http://localhost:3000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(query)
    });

    const data = await response.json();
    console.log("Response from Fluree Proxy:", data);
  } catch (error) {
    console.error("Error testing Fluree Proxy:", error);
  }
}

testFlureeProxy();
