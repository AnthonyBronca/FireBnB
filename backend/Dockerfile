#Build dev
FROM --platform=linux/amd64 node:18-alpine as development

WORKDIR /app/backend

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build
# RUN npm run db-build


#Buld production

FROM --platform=linux/amd64 node:18-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}
ARG SCHEMA
ENV SCHEMA=${SCHEMA}

WORKDIR /app/backend

COPY package*.json .

RUN npm ci --only=production

COPY --from=development /app/backend/dist ./dist

RUN npm run build-production

# EXPOSE 5000:5000

CMD [ "npm", "start" ]
