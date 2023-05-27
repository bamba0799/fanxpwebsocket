FROM node:18-alpine

WORKDIR /var/www/can-2023

# Bundle app source
COPY . .

# Install deps & build app
RUN yarn \
    && yarn build

EXPOSE 9200

CMD [ "yarn", "start" ]