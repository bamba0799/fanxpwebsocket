FROM node:18-alpine

# app dir
WORKDIR /var/www/can-2023


COPY . /var/www/can-2023


# Install `yarn` globally
RUN npm --version \ 
    npm i -g yarn \
    yarn --version


RUN yarn \
    yarn build \
    dir


EXPOSE 9200


CMD [ "yarn", "start" ]
