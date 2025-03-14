# Use a Node 18 base image
FROM node:18-alpine

# Declare build arguments
ARG ENVIRONMENT
ARG HOST
ARG PORT
ARG NODE_ENV
ARG NODE_PATH

# Install dependencies
RUN apk add --no-cache make

# Create an application directory
RUN mkdir -p /app

# Set working directory
WORKDIR /app

# Copy package files separately to leverage Docker layer caching
COPY package*.json ./

# Install dependencies before copying other files
RUN npm install  #

# Copy application files
COPY . ./

# Debugging: Check installed modules
RUN ls -la node_modules || true






# Start the application
CMD ["sh", "-c", "npm run start"]

# Expose the port (ensure default is set)
EXPOSE ${PORT}

