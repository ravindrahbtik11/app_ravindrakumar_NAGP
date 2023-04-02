 FROM node:18.14.2-alpine as build-step
    RUN mkdir -p /app
    WORKDIR /app
    COPY package.json /app
    RUN npm install --force
    COPY . .
    RUN npm run build --prod
    FROM nginx:1.20.1
    COPY --from=build-step /app/dist/eCommerce-Web /usr/share/nginx/html
    EXPOSE 4500:80
    EXPOSE 4500:443