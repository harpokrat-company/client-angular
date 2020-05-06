FROM node:14 AS builder

ARG NPM_AUTH_TOKEN

WORKDIR /build
COPY package.json .npmrc ./
RUN npm install

COPY ./ ./
RUN npm run build --prod

FROM nginx:1.17

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /build/dist/angular-web-client /usr/share/nginx/html
