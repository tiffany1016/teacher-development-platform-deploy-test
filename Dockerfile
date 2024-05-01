# Use the official Node.js image as a parent image
# FROM node:14
FROM node:18.17.0

# Set the working directory
WORKDIR /usr/src/app

# Copy the package.json and yarn.lock files
COPY package.json yarn.lock ./

# Install dependencies
# RUN yarn install
RUN yarn

# Copy the rest of your application's code
COPY . .

# Build your Next.js application
# RUN yarn build

# Make port 3000 available to the world outside this container
EXPOSE 8080

# Define environment variable
ENV PORT=8080

# Run the Next.js app
CMD ["yarn", "dev"]

