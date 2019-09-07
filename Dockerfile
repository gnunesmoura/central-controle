FROM node:10 as build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production
COPY . .

FROM node:10 as unit-tests
WORKDIR /usr/src/app
COPY --from=build /usr/src/app .
RUN npm install
RUN npm run test

FROM node:10
WORKDIR /usr/src/app
COPY --from=build /usr/src/app .
CMD [ "npm", "run", "start" ]
