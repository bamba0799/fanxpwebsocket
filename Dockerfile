## Dockerfile by Ersit
FROM node:18-alpine


# Create app directory
WORKDIR /var/www/can-2023


# Bundle app source
COPY . /var/www/can-2023


RUN yarn \
    yarn build \
    dir


EXPOSE 9200


CMD [ "yarn", "start" ]
