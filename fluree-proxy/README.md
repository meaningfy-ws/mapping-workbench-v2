# Fluree Proxy

This repository contains a simple HTTP server built with Bun.

## Getting Started

### Prerequisites

Ensure you have Bun installed on your system. Bun is primarily designed for Unix-like operating systems, such as Linux and macOS. On Windows, you can use Bun through the Windows Subsystem for Linux (WSL). If you haven't installed Bun yet, follow the instructions below.

#### Fluree Database

Ensure you have the Fluree database installed and running. You can download the latest version from the [Fluree website](https://flur.ee/download). Follow the instructions provided to set up and start the database on your system. The default port for Fluree is 58090 or 8090, which should be accessible for the Fluree Proxy server to connect.

### Installation

1. **Install Bun**: If you haven't installed Bun yet, run the following command:

   ```bash
   curl -fsSL https://bun.sh/install | bash
   ```

   After installation, make sure to update your shell's environment by running:

   ```bash
   source ~/.bashrc
   ```

   For more details, visit the [Bun website](https://bun.sh/).

2. **Install dependencies**: Run the following command to install the necessary dependencies:

   ```bash
   bun install
   ```

### Running the Server

1. **Start the server**: Use the following command to start the server:

   ```bash
   bun run server.js
   ```

2. **Verify the server is running**: Open a new terminal window and execute:

   ```bash
   curl http://localhost:3000
   ```

   You should receive a response listing the available routes, confirming the server is operational. The response will look like this:

   ```json
   {
     "availableRoutes": [
       {
         "path": "/query",
         "description": "POST request in FlureeQL for read (SELECT) queries"
       },
       {
         "path": "/transact",
         "description": "POST request in FlureeQL for write (INSERT) queries)"
       }
     ]
   }
   ```

### Query Examples

Here are some examples of how to use the Fluree Proxy server for querying and transacting data.

#### Query Example

To perform a read (SELECT) query, send a POST request to the `/query` endpoint with a JSON body. Here's an example:

```json
{
  "select": { "?s": ["*"] },
  "where": {
    "@id": "?s"
  }
}
```

#### Transact Example

To perform a write (INSERT) transaction, send a POST request to the `/transact` endpoint with a JSON body. Here's an example:

```json
{
  "insert": {
    "name": "Derek",
    "species": "yeti",
    "favorite_food": "kale"
  }
}
```

### Running with Docker

To run the Fluree Proxy server using Docker, follow these steps:

1. **Build the Docker image**: Use the following command to build the Docker image:

   ```bash
   docker build -t fluree-proxy .
   ```

2. **Run the Docker container**: Start the container with the following command, ensuring the database is accessible already from outside (default port 58090 or 8090):

   ```bash
   docker run -p 3000:3000 -e DB_HOST=host.docker.internal fluree-proxy
   ```

   This command binds the application port (3000) to the host, allowing you to access the server at `http://localhost:3000`.

3. **Stopping the Docker container**: If you need to stop the container and `Ctrl+C` doesn't work, use the following commands:

   - List all running containers to find the container ID or name:

     ```bash
     docker ps
     ```

   - Use the container ID or name from the list to stop the container:

     ```bash
     docker stop <container_id_or_name>
     ```

   Replace `<container_id_or_name>` with the actual ID or name of your running container.

   Alternatively, you may run docker in _detached_ mode:

   ```bash
   docker run -d -p 3000:3000 -e DB_HOST=host.docker.internal fluree-proxy
   ```

   This will avoid put the startup in the background, not requiring CTRL+C. The stopping method above still applies in this case.

### Testing

To run the tests for the Fluree Proxy server, use the following command:

```bash
bun test
```

This command will execute all the test cases defined in your project, ensuring that the server behaves as expected.
