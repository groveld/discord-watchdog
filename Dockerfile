FROM node:13.13-slim

LABEL maintainer="Martin Groeneveld <martin@groveld.com>"

RUN mkdir -p /usr/src/watchdog/app /usr/src/watchdog/config

WORKDIR /usr/src/watchdog/app

COPY package*.json .
RUN npm install --only=prod

COPY src .

RUN chown -R nobody:users /usr/src/watchdog \
  && chmod -R ugo-x,u+rwX,go+rX,go-w /usr/src/watchdog

EXPOSE 5052/tcp
VOLUME /usr/src/watchdog/config

USER nobody

CMD ["node", "index.js"]
