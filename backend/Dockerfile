#node version
FROM node:18-alpine
ENV NODE_ENV=development

WORKDIR /.

COPY ./dist /dist
COPY ./package.json /package.json
COPY ./package-lock.json /package-lock.json

RUN npm install --development

COPY . .

WORKDIR /dist/

EXPOSE 8000

CMD [ "node", "bin/www" ]
