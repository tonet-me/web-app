# Use an official Node.js image as the base image
FROM node:alpine as build
# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --silent

# Copy the rest of the application code
COPY . .

# Build the Angular application
RUN npm run build

# Expose the SSR port (if needed)
EXPOSE 4000

# Command to start the SSR server
CMD ["npm", "run", "serve:ssr:my.tonet"]
