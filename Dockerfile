FROM node:lts-alpine

RUN mkdir -p /usr/src/app && chown -R node:node /usr/src/app

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

USER node

RUN npm install pm2 -g

RUN npm install && npm cache clean --force --loglevel=error

COPY --chown=node:node . .

CMD [ "pm2-runtime", "start", "ecosystem.config.js" ]
