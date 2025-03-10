# Use a Node image with React build support
FROM node:18-alpine as build

ARG ENV_FILE
ARG ENVIRONMENT
ARG MW_BACKEND_PORT
ARG MW_BACKEND_HOST

# Create an application directory
RUN mkdir -p /app

WORKDIR /app

# Copy package.json and install dependencies separately for better caching
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application
COPY . ./

RUN echo "MW_BACKEND_HOST=${MW_BACKEND_HOST}" >> ${ENV_FILE} \
    && echo "MW_BACKEND_PORT=${MW_BACKEND_PORT}" >> ${ENV_FILE}

# Install a lightweight HTTP server for serving React
RUN npm run build


# Start the frontend server
CMD ["npm", "run", "start"]

# Expose the correct port
EXPOSE 3000