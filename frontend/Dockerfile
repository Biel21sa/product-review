FROM node:18-alpine AS development

WORKDIR /app

COPY frontend/package*.json ./

RUN npm install

COPY frontend/. ./

CMD ["npm", "run", "dev"]

FROM node:18-alpine AS production

WORKDIR /app
COPY frontend/package*.json ./
RUN npm install --production
COPY frontend/. ./
RUN npm run build

FROM nginx:alpine
COPY --from=production /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]