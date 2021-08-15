FROM node:current-alpine3.11

WORKDIR /usr/app

COPY package.json ./
RUN npm install

COPY . .

EXPOSE 3333

CMD ["npm", "start"]