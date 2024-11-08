# Fluree Proxy

This repository contains a simple HTTP server built with Bun.

## Getting Started

### Prerequisites

Ensure you have Bun installed on your system. Bun is primarily designed for Unix-like operating systems, such as Linux and macOS. On Windows, you can use Bun through the Windows Subsystem for Linux (WSL). If you haven't installed Bun yet, follow the instructions below.

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

### Running with Docker

To run the Fluree Proxy server using Docker, follow these steps:

1. **Build the Docker image**: Use the following command to build the Docker image:

   ```bash
   docker build -t fluree-proxy .
   ```

2. **Run the Docker container**: Start the container with the following command, ensuring the database is accessible:

   ```bash
   docker run -p 3000:3000 -e DB_HOST=host.docker.internal fluree-proxy
   ```

   This command binds the application port (3000) to the host, allowing you to access the server at `http://localhost:3000`.

### Running Tests

To run the tests for the Fluree Proxy server, you can use the following command:

```bash
bun test
```

This command will execute all the test cases defined in your project, ensuring that the server behaves as expected.
