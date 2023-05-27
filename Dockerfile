FROM node:18-alpine

WORKDIR /var/www/can-2023

# Bundle app source
COPY . .

# Install app deps
RUN yarn \
    && yarn build

EXPOSE 9200

CMD [ "yarn", "start" ]