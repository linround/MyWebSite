FROM nginx
COPY nginx.conf /etc/nginx/nginx.conf



FROM node:16


# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

CMD [ "node", "scripts/build.js" ]

COPY build /usr/share/nginx/html