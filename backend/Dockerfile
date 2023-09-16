FROM node:18-alpine as build

WORKDIR /backend

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build




FROM node:18-alpine as api

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ARG SCHEMA=firebnb
ENV SCHEMA=${SCHEMA}
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}
ARG JWT_SECRET
ENV JWT_SECRET=${JWT_SECRET}
ARG JWT_EXPIRES_IN
ENV JWT_EXPIRES_IN=${JWT_EXPIRES_IN}

WORKDIR /api

COPY package*.json .

RUN npm install --only=production
COPY --from=build backend/dist .

EXPOSE 8000
# RUN npm run build-production

CMD [ "node", "bin/www" ]
