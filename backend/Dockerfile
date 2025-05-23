FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install # Ou yarn install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ] # Ou yarn start para produção