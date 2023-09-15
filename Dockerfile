FROM --platform=amd64 node:18-alpine as backendbuild

WORKDIR /backend

COPY /backend/package*.json .

RUN npm install

COPY /backend .

RUN npm run build


FROM --platform=amd64 node:18-alpine as api

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ARG SCHEMA=firebnb
ENV SCHEMA=${SCHEMA}
ARG DATABASE_URL=postgres://anthony_projects_2xc7_user:dXxAVN25YqeiqPpuSUCzsV0ZylNmGd0F@dpg-cjldh85k5scs73ekvj00-a.ohio-postgres.render.com/anthony_projects_2xc7
ENV DATABASE_URL=${DATABASE_URL}
ARG JWT_SECRET
ENV JWT_SECRET=${JWT_SECRET}
ARG JWT_EXPIRES_IN
ENV JWT_EXPIRES_IN=${JWT_EXPIRES_IN}

WORKDIR /api

COPY /backend/package*.json .

RUN npm install --only=production

COPY --from=backendbuild backend/dist .

RUN npm run build-production
# RUN npm run db-migrate
# RUN npm run db-seed

CMD [ "node", "bin/www"]
