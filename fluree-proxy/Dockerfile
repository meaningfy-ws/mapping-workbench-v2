# Use the official Bun image as the base
FROM oven/bun:latest

# Create and set the working directory
WORKDIR /app

# Set the working directory
WORKDIR /app

# Copy the application code
COPY . .

# Install dependencies
RUN bun install

# Expose the ports the app and database run on
EXPOSE 3000 58090

# Start the server
CMD ["bun", "run", "server.ts"]
