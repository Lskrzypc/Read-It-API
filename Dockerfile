# Dockerfile
FROM node:22-alpine

WORKDIR /usr/app

COPY package*.json ./
COPY .npmrc ./

RUN npm install

COPY tsconfig.json ./
COPY src ./src

RUN npm run build

USER node

EXPOSE 8080

CMD ["node", "./dist/index.js"]