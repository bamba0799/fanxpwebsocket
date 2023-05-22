## Dockerfile by Ersit
FROM node:18

# run non-interactive. Suppresses prompts and just accepts defaults automatically.
ENV DEBIAN_FRONTEND=noninteractive

# Adding some packages
RUN apt-get update; \
    apt-get -yq upgrade; \
    apt-get install -y --no-install-recommends \
    apt-utils \
    nano; \
    apt-get -yq autoremove; \
    apt-get clean; \
    rm -rf /var/lib/apt/lists/*

# Create app directory
# WORKDIR /var/www/can-2023

# Install app dependencies
# A wildcard is used to ensure both package.json AND yarn.lock are copied
# COPY package.json ./
# COPY yarn.lock ./

# If you are building your code for production
# RUN npm ci --omit=dev
RUN npm install -g ts-node
RUN npm install -g typescript


# Bundle app source
COPY . /var/www/can-2023
RUN dir

# install dependencies then build
RUN yarn
RUN npx -v
RUN yarn build

EXPOSE 8080
CMD [ "yarn", "start" ]
RUN dir
