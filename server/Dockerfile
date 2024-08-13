# Use the official Node.js image as a base image
FROM node:16

# Install necessary packages
RUN apt-get update && \
    apt-get install -y apt-transport-https ca-certificates curl gnupg-agent software-properties-common && \
    apt-get update && \
    curl -sSL https://get.docker.com/ | sh && \
    apt-get install -y docker redis-server && \
    rm -rf /var/lib/apt/lists/*

# Install GCC, Python, and the latest OpenJDK
RUN apt-get update && \
    apt-get install -y gcc python default-jdk

# Set a build argument for the environment variable
ARG CONNECTION_STRING
# Set the environment variable in the container
ENV CONNECTION_STRING=$CONNECTION_STRING 
ARG VITE_TinyMCE_KEY
# Set the environment variable in the container
ENV VITE_TinyMCE_KEY=$VITE_TinyMCE_KEY 

    
# Create a directory for the Node.js server code
WORKDIR /app

# Copy the Node.js server code into the container
COPY . .

# Install the dependencies
RUN npm install

# Expose the necessary ports
EXPOSE 3000

# Start the Node.js server
# CMD node index.js
CMD ["/bin/bash", "-c", "redis-server & node index.js"]
