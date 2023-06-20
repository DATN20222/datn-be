# Use the official Node.js 14.x image as the base image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the project dependencies
RUN npm i -g @nestjs/cli

#Install dependencies
RUN npm i

# Copy the entire project to the working directory
COPY . .

# Expose the port on which the NestJS application will run
EXPOSE 8800

# Start the NestJS application
CMD [ "npm", "start" ]
