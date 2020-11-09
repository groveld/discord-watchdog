FROM node:13.13-slim

LABEL maintainer="Martin Groeneveld <groveld@pm.me>"

RUN mkdir -p /usr/src/watchdog/app /usr/src/watchdog/config

WORKDIR /usr/src/watchdog/app

COPY package*.json ./

RUN npm install --production

COPY --chown=node:node src ./

VOLUME /usr/src/watchdog/config

EXPOSE 5052/tcp

USER node

CMD ["node", "index.js"]
