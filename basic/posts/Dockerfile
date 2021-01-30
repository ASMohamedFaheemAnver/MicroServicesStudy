From node:12.20.1-alpine

WORKDIR /user/app

COPY package.json ./

RUN npm install

COPY ./ ./

CMD ["npm", "start"]