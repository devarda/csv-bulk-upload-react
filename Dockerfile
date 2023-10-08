# Use the official node image
FROM node:20-buster

# Set the working directory
WORKDIR /app

# Copy the rest of the files
COPY ./server ./server
COPY ./frontend ./frontend

# Install the server dependencies
WORKDIR /app/server
RUN yarn install

# Build the frontend
WORKDIR /app/frontend
RUN yarn install
RUN yarn build

# Expose port 3000 for the app
EXPOSE 3000

WORKDIR /app/server

CMD [ "yarn", "start" ]
