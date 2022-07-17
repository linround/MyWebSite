FROM nginx:alpine
COPY build /usr/share/nginx/html
LABEL maintainer = "usha.mandya@docker.com"