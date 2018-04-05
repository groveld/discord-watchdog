FROM node:latest
WORKDIR /app/discordjs-bot
COPY package.json ./
RUN npm install
COPY app ./
VOLUME /config
EXPOSE 5000
CMD [ "node", "main.js" ]
