FROM --platform=amd64 node:18-alpine as backendbuild

WORKDIR /backend

COPY /backend/package*.json .

RUN npm install

COPY /backend .

RUN npm run build


FROM --platform=amd64 node:18-alpine as api

RUN apk add build-base
RUN apk add postgresql-dev


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

WORKDIR /var/www

COPY /backend/package*.json .

COPY /backend/.sequelizerc .

RUN npm install --only=production

COPY --from=backendbuild backend/dist ./dist

# RUN npm run build-production
# RUN npm run db-migrate
# RUN npm run db-seed
EXPOSE 8000
CMD [ "npm", "start"]
