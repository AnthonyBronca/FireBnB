FROM --platform=amd64 node:18-alpine as build

WORKDIR /backend

COPY ./package*.json .

RUN npm install

COPY . .

RUN npm run build

# -------

FROM --platform=amd64 node:18-alpine as api

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

ARG SCHEMA=firebnb_schema
ENV SCHEMA=${SCHEMA}

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

ARG JWT_SECRET=strongpassword
ENV JWT_SECRET=${JWT_SECRET}

ARG JWT_EXPIRES_IN=604800
ENV JWT_EXPIRES_IN=${JWT_EXPIRES_IN}

ARG VITE_GOOGLE_API_KEY
ENV VITE_GOOGLE_API_KEY=${VITE_GOOGLE_API_KEY}

ARG AWS_ACCESS_KEY_ID
ENV AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}

ARG AWS_BUCKET_NAME
ENV AWS_BUCKET_NAME=${AWS_BUCKET_NAME}

ARG AWS_SECRET_ACCESS_KEY
ENV AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}


WORKDIR /api

COPY ./package*.json .

COPY ./.sequelizerc .

RUN npm install --only=production
RUN npm install @faker-js/faker

COPY --from=build backend/dist ./dist

EXPOSE 8000

CMD ["npm", "start"]
