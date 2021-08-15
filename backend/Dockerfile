FROM node:current-alpine3.11

RUN mkdir -p /app/back
WORKDIR /app/back

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3333

CMD ["npm", "start"]