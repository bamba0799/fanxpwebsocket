FROM node:18

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update; \
    apt-get -yq upgrade; \
    apt-get install -y --no-install-recommends \
    apt-utils \
    nano; \
    apt-get -yq autoremove; \
    apt-get clean; \
    rm -rf /var/lib/apt/lists/*

WORKDIR /var/www/can-2023

COPY . /var/www/can-2023

RUN yarn \
    && yarn build \
    && dir

EXPOSE 9200

CMD [ "yarn", "start" ]
