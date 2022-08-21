FROM nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY build /usr/share/nginx/html
LABEL maintainer = "usha.mandya@docker.com"