FROM node:latest

# set version label
ARG BUILD_DATE
ARG VERSION
LABEL build_version="Version:- ${VERSION} Build-date:- ${BUILD_DATE}"
LABEL maintainer="groveld"

# environment settings
ENV BOT_DATA="/config"
ENV BOT_PORT="5000"
ENV BOT_OWNER=""
ENV BOT_TOKEN=""




VOLUME /config

WORKDIR /app/discordjs-bot
COPY package.json ./
RUN npm install
COPY app ./


# add local files
COPY root/ /

# ports and volumes
EXPOSE 5000
VOLUME /config

EXPOSE 5000

CMD [ "node", "main.js" ]
