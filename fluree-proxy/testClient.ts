import fetch from "node-fetch";
import { v4 as uuidv4 } from 'uuid';

const query = {
  // from: "cryptids",
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
    "schema:name": "MWB2 Periodic",
  }
};

const transactionViolation = {
  "@context": {
    "@vocab": "https://meaningfy.ws/mapping-workbench/",
    "@base": "https://meaningfy.ws/data-centric-app-demo/",      
    "mwb": "http://meaningfy.ws/mapping-workbench/",
    "schema": "http://schema.org/",
    "sh": "http://www.w3.org/ns/shacl#"
  },
  insert: {
    "@id": "mwb1",
    "@type": "mwb:Project",
    "schema:name": "MWB1.2",
  }
};

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
        "@id": "mwb1",
        "@type": "mwb:Project",
        "schema:name": "MWB1",
        "schema:description": "This is an eForms Project"
      }
  ]
}

async function testFlureeProxyWritePolicy() {
  try {
    const response = await fetch("http://localhost:3000/transact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(policy, null, 2)
    });

    const data = await response.json();

    console.log("Response from Fluree Proxy for WritePolicy:", data);
  } catch (error) {
    console.error("Error testing Fluree Proxy:", error);
  }
}

async function testFlureeProxyWriteData() {
  try {
    const response = await fetch("http://localhost:3000/transact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(transaction, null, 2)
    });

    const data = await response.json();

    console.log("Response from Fluree Proxy for WriteData:", data);
  } catch (error) {
    console.error("Error testing Fluree Proxy:", error);
  }
}

async function testFlureeProxyWriteViolation() {
  try {
    const response = await fetch("http://localhost:3000/transact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(transactionViolation, null, 2)
    });

    const data = await response.json();

    console.log("Response from Fluree Proxy for WriteViolation:", data);
  } catch (error) {
    console.error("Error testing Fluree Proxy:", error);
  }
}

async function testFlureeProxyReadData() {
  try {
    const response = await fetch("http://localhost:3000/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(query, null, 2)
    });

    const data = await response.json();

    console.log("Response from Fluree Proxy for ReadData:", data);
  } catch (error) {
    console.error("Error testing Fluree Proxy:", error);
  }
}

// testFlureeProxyWritePolicy();
testFlureeProxyWriteData();
testFlureeProxyReadData();
testFlureeProxyWriteViolation();
