FROM node:carbon

# Create app directory
WORKDIR /usr/app

# Install app dependencies
COPY package.json .

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

# Expose app port from docker container
EXPOSE 3002

# Run app
CMD [ "npm", "run", "start-dev" ]