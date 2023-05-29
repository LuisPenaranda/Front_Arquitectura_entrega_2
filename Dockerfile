# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node AS prod

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

COPY --from=prod /app/build .

EXPOSE 80

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]