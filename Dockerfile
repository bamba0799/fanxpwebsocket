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

RUN yarn && yarn build

COPY . .

ENV PORT=9200
ENV DATABASE_URL="mysql://can2023:can2023Digital@217.182.139.100:3306/can2023"

RUN dir

EXPOSE 9200

CMD [ "yarn", "start" ]
