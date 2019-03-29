FROM node:8.15-alpine

# add local files
WORKDIR /app
COPY package.json .
RUN npm install
COPY app .

# ports and volumes
EXPOSE 5000
VOLUME /config

# start app
CMD [ "node", "index.js" ]
