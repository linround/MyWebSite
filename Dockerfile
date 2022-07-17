FROM nginx:alpine
#RUN npm install
#RUN npm build
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY build /usr/share/nginx/html
LABEL maintainer = "usha.mandya@docker.com"