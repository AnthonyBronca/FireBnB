#node version
FROM node:18-alpine


WORKDIR /.

COPY ./package.json /package.json
COPY ./package-lock.json /package-lock.json

RUN npm install

COPY . .

EXPOSE 8000

CMD [ "npm", "start" ]
