# Build backend development
FROM node:18-alpine as build_backend
# Set the workdir to be in the backend of our docker app
WORKDIR /app/backend
# copy package*.json from backend folder to backend of docker
COPY /backend/package*.json .
# Run npm install in the backend
RUN npm install
# Copy the node_modules, src into backend
COPY /backend/ .
# build the dist folder in the docker
RUN npm run build


#production
FROM node:18-alpine as production


ARG NODE_ENV=production
ARG DATABASE_URL
ARG SCHEMA

WORKDIR /app/backend

# COPY package*.json .

# RUN npm install --only=production
#Copy the dist folder into the backend folder
COPY --from=build_backend /app/backend/dist .

RUN npm run build-production
# RUN npm run db:reset
# EXPOSE 5000:5000

CMD [ "npm", "start" ]
