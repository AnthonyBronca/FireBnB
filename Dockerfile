# Build for API. Converts Typescript into Javascript for production
FROM --platform=amd64 node:18-alpine as backendbuild

WORKDIR /backend

COPY /backend/package*.json .

RUN npm install

COPY /backend .

RUN npm run build

# # Build for React. Converts TSX and React into a static html bundle
FROM --platform=amd64 node:18-alpine as frontendbuild

WORKDIR /frontend

COPY frontend/package*.json .

ENV VITE_NODE_ENV=production

RUN npm install --legacy-peer-deps

COPY /frontend/ .

RUN npm run build


# Production level Image: Inherits from built api and frontend images
FROM --platform=amd64 node:18-alpine as production


ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

ENV VITE_NODE_ENV=production

ARG SCHEMA=firebnb
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


WORKDIR /var/www

COPY /backend/package*.json .

COPY /backend/.sequelizerc .


COPY --from=frontendbuild frontend/dist ./dist/routes/dist
COPY --from=frontendbuild frontend/public ./dist/routes/dist/public
# COPY /frontend/dist ./dist/react-app
# COPY /frontend/public ./dist/react-app/public


RUN npm install --only=production
RUN npm install @faker-js/faker


COPY --from=backendbuild backend/dist ./dist
COPY ./backend/static ./static


EXPOSE 8000
CMD [ "npm", "start"]
