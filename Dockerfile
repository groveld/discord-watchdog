FROM node:8.15-alpine
LABEL maintainer="Martin Groeneveld <martin@groveld.com>"

# Create app directory
WORKDIR /usr/src/watchdog/app

# Install app dependencies
COPY package*.json .
RUN npm install --only=prod

# Bundle app source files
COPY app .

# Define ports and volumes
EXPOSE 5000/tcp
VOLUME /usr/src/watchdog/config

# Start app
CMD ["node", "app.js"]
