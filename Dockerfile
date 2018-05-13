FROM node:latest

# add local files
WORKDIR /app/discord-bot
COPY package.json .
RUN npm install
COPY src .

# ports and volumes
EXPOSE 5000
VOLUME /config

# start app
CMD [ "node", "index.js" ]
