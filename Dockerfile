FROM node:18

# Run non-interactive mode
ENV DEBIAN_FRONTEND=noninteractive

# Install some packages
RUN apt-get update; \
    apt-get -yq upgrade; \
    apt-get install -y --no-install-recommends \
    apt-utils \
    nano; \
    apt-get -yq autoremove; \
    apt-get clean; \
    rm -rf /var/lib/apt/lists/*


WORKDIR /var/www/can-2023

# Bundle app source
COPY . .

# Install deps & build app
RUN yarn \
    && yarn build

RUN dir

EXPOSE 9200

CMD [ "yarn", "start" ]