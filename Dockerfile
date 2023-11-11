# Build for API. Converts Typescript into Javascript for production
FROM --platform=amd64 node:18-alpine as backendbuild

WORKDIR /backend

COPY /backend/package*.json .

RUN npm install

COPY /backend .

RUN npm run build



# Build for React. Converts TSX and React into a static html bundle

FROM --platform=arm64 node:18-alpine as frontendbuild

WORKDIR /frontend

COPY /frontend/package*.json .

RUN npm install

COPY /frontend .

RUN npm run build

# Production level Image: Inherits from built api and frontend images
FROM --platform=amd64 node:18-alpine as api


ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

ARG SCHEMA=firebnb
ENV SCHEMA=${SCHEMA}

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

ARG JWT_SECRET=strongpassword
ENV JWT_SECRET=${JWT_SECRET}

ARG JWT_EXPIRES_IN=604800
ENV JWT_EXPIRES_IN=${JWT_EXPIRES_IN}

WORKDIR /var/www

COPY /backend/package*.json .

COPY /backend/.sequelizerc .


COPY --from=frontendbuild frontend/dist ./dist/react-app
COPY --from=frontendbuild frontend/public ./dist/react-app/public
# COPY /frontend/dist ./dist/react-app
# COPY /frontend/public ./dist/react-app/public


RUN npm install --only=production


COPY --from=backendbuild backend/dist ./dist


EXPOSE 8000
CMD [ "npm", "start"]
