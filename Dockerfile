# Use an official Node.js image as the base image
FROM node:18.17.0 as build

ENV APP_NAME my.tonet
# Set the working directory in the container
WORKDIR /$APP_NAME

# Copy package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Angular application
RUN npm run build

# Expose the SSR port (if needed)
EXPOSE 4000

# Command to start the SSR server
CMD ["npm", "run", "serve:ssr:my.tonet"]
