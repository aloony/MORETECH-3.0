FROM node:12 as BUILDER

WORKDIR /usr/web

COPY package*.json ./

RUN npm i
RUN npm i -g parcel@1.12.3

COPY . .

RUN npm run build:release

FROM nginx:latest

COPY --from=BUILDER /usr/web/dist /usr/share/nginx/html/web