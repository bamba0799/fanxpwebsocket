FROM node:18

# Create app directory
WORKDIR /Users/davso/Desktop/code/projects/api

# Install app dependencies
# A wildcard is used to ensure both package.json AND yarn.lock are copied
COPY package.json ./
COPY yarn.lock ./

# If you are building your code for production
# RUN npm ci --omit=dev
RUN yarn install --frozen-lockfile

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "yarn", "start" ]
