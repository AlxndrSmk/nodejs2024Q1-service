FROM node:lts-alpine3.19
RUN mkdir -p /server
WORKDIR /server
COPY . /server
RUN npm install
CMD [ "npm", "run", "start:dev"]
EXPOSE 8080