FROM node:14.16.1-alpine

WORKDIR /usr/src

# Copy sources
COPY ./src ./app

# Copy files
COPY package.json ./app
COPY tsconfig.json ./app
COPY tsconfig.build.docker.json ./app/tsconfig.build.json

WORKDIR /usr/src/app

# Install NPM packages
RUN npm install

RUN npm run build

CMD [ "npm", "run", "start:prod" ]