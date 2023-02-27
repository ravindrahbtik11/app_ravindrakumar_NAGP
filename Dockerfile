 FROM node:16.15.1-alpine as build-step
    RUN mkdir -p /app
    WORKDIR /app
    COPY package.json /app
    RUN npm install --legacy-peer-deps
    COPY . .
    RUN npm run build --prod
    FROM nginx:1.20.1
    COPY --from=build-step /app/dist/eCommerce-Web /usr/share/nginx/html
    EXPOSE 4500:80