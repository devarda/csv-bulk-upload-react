# Use the official node image
FROM node:20-buster

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock first to leverage Docker caching
COPY ./server/package.json ./server/yarn.lock ./

# Install app dependencies
RUN yarn install

# Copy the rest of the files
COPY ./server ./
COPY ./frontend ./frontend

# Build the frontend
WORKDIR /app/frontend
RUN yarn install
RUN yarn build

# Expose port 3000 for the app
EXPOSE 3000

WORKDIR /app/server

CMD [ "yarn", "start" ]
