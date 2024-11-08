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

   You should receive a response listing the available routes, confirming the server is operational.

### Accessing the Server

You can also access the server by navigating to `http://localhost:3000` in your web browser.
