## Dockerfile by Ersit
FROM node:18


# Run non-interactive mode. 
# Suppresses prompts and just accepts defaults automatically.
ENV DEBIAN_FRONTEND=noninteractive


# Add some packages
RUN apt-get update; \
    apt-get -yq upgrade; \
    apt-get install -y --no-install-recommends \
    apt-utils \
    nano; \
    apt-get -yq autoremove; \
    apt-get clean; \
    rm -rf /var/lib/apt/lists/*

# Create app directory
WORKDIR /var/www/can-2023


# Bundle app source
COPY . /var/www/can-2023
RUN dir


# Install dependencies
RUN yarn


# Set the port
EXPOSE 9200


# Build and run the app
CMD [ "yarn", "start" ]
