FROM node:18.16.0 as build

WORKDIR /app

COPY package.json .
RUN yarn install

COPY . .

RUN yarn build

FROM nginx

RUN mkdir /app

# Copy the conf and content to docker host
COPY --from=build /app/build /app
COPY nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]