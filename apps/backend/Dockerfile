FROM node:16-alpine

WORKDIR /app

COPY ./package.json .
RUN npm install --omit=dev
COPY ./dist .

CMD ["node", "index.js"]
