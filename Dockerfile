FROM node:18-alpine

WORKDIR /var/www/can-2023

# Bundle app source
COPY . .

# Install app deps
RUN yarn \
    && yarn build

WORKDIR /var/www/can-2023/dist

EXPOSE 9200

CMD node src/index.js