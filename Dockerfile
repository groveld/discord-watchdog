FROM node:latest
WORKDIR /discordjs-bot
COPY package*.json ./
RUN npm install
COPY app ./app
VOLUME /config
EXPOSE 8080
CMD [ "npm", "start" ]
