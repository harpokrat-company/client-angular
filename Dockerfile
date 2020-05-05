FROM node:14 AS builder

ARG NPM_AUTH_TOKEN

WORKDIR /build
COPY package.json package-lock.json .npmrc ./
RUN npm install

COPY ./ ./
RUN yarn run build --prod

FROM nginx:1.17

COPY --from=builder /build/dist/web /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
