FROM node:latest
WORKDIR /discordjs-bot
COPY package*.json ./
RUN npm install
COPY src ./src
VOLUME /config
EXPOSE 8080
CMD [ "npm", "start" ]
