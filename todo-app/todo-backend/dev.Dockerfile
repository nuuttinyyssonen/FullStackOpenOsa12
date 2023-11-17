FROM node:16

WORKDIR /usr/src/app

COPY . .
RUN npm ci

ENV DEBUG=playground:*

USER node
CMD ["npm", "run", "dev"]