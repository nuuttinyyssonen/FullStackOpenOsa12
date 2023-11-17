FROM node:16 AS testing

WORKDIR /usr/src/app

COPY . .
RUN npm ci

RUN CI=true npm test

FROM testing AS build-stage

WORKDIR /usr/src/app

COPY . .

RUN npm ci
ARG REACT_APP_BACKEND_URL
ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL

RUN npm run build

# RUN npm install -g serve

# CMD ["serve", "-s", "build", "-p", "3000"]

# This is a new stage, everything before this is gone, except the files we want to COPY
FROM nginx:1.20-alpine
# COPY the directory build from build-stage to /usr/share/nginx/html
# The target location here was found from the Docker hub page
COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html