# Use an official Node runtime as a base image
FROM --platform=amd64 node:16-alpine

# Set the working directory in the container
WORKDIR /app

# Install the Expo CLI globally
RUN npm install -g expo-cli

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY ./web-build .

# Build the Expo web app

# Expose the port on which the app will run (modify this if needed)
EXPOSE 8081

# Start the Expo web app
CMD ["npm", "start"]
