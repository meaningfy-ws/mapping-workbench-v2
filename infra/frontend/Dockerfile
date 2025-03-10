# Use a Node image with React build support
FROM node:18-alpine as build
ARG ENV_FILE
ARG ENVIRONMENT
ARG HOST
ARG MW_FRONTEND_SERVER_PORT
ARG NODE_ENV
ARG NODE_PATH

WORKDIR /app

# Copy package.json and install dependencies separately for better caching
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application
COPY . ./

# Build the React application

# Install a lightweight HTTP server for serving React
RUN npm run build


# Start the frontend server
CMD ["npm", "run", "start"]

# Expose the correct port
EXPOSE 3000