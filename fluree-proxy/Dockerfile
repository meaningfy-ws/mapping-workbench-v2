# Use a lightweight Node.js image as the base
FROM node:18-alpine

# Install Bun
RUN curl -fsSL https://bun.sh/install | bash

# Set the environment variable for Bun
ENV BUN_INSTALL="/root/.bun"
ENV PATH="$BUN_INSTALL/bin:$PATH"

# Create and set the working directory
WORKDIR /app

# Copy package.json and bun.lockb
COPY package.json bun.lockb ./

# Install dependencies
RUN bun install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Start the server
CMD ["bun", "run", "server.ts"]
