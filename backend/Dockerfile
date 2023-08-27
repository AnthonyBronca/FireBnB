# node version set to 18 from alpine image

FROM --platform=linux/amd64 node:18-alpine as development
# set the work dir for our docker container
WORKDIR /usr/src/app
# copy both the package.json and package-lock.json
COPY package*.json .
# run npm install within the /usr/src/app container
RUN npm install
# Copy all the files in that workdir
COPY . .
# run the build command to convert Typescript into JS
RUN npm run build-development
RUN npm run db-build



# 2nd container using Node
FROM node:18-alpine as production
# Set an variable to production
ARG NODE_ENV=production
# Set Environmnent to whatever our argument above is set to
ENV NODE_ENV=${NODE_ENV}

# make an empty arg for db url
ARG DATABASE_URL
# use the db url that is passed in at build time

ARG SCHEMA=firebnb
ENV SCHEMA=${SCHEMA}
# Set the workdir of the 2nd container
WORKDIR /usr/src/app
# Copy both package.json files into the 2nd container
COPY package*.json .
# install all production dependencies into the 2nd container. Keeps this build light
# ci does a clean-install from package-lock instead of using cached versions
RUN npm ci --only=production
#from development container, copy the dist file into app of 2nd container. Src no longer included
COPY --from=development /usr/src/app/dist ./dist



# EXPOSE 8000

CMD [ "node", "dist/bin/www" ]
