FROM node:22-alpine

EXPOSE 3000

WORKDIR /usr/app

COPY package*.json ./
COPY .npmrc ./
RUN npm ci --omit=dev
COPY ./dist ./dist

USER node

CMD ["node", "./dist/index.js"]

