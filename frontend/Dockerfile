FROM node:current-alpine3.11

RUN mkdir -p app/front
WORKDIR app/front

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]