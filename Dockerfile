FROM nginx:latest

RUN mkdir -p /app
WORKDIR /app

COPY dist /usr/share/nginx/html

EXPOSE 80

