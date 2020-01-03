FROM node:alpine
LABEL maintainer="Martin Groeneveld <martin@groveld.com>"

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json .
RUN npm install

# Bundle app source files
COPY app .

# Define ports and volumes
EXPOSE 5000/tcp
VOLUME /config

# Start app
CMD ["node", "index.js"]
