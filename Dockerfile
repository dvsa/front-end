FROM --platform=linux/amd64 node:12.16.3
# Create app directory
WORKDIR /usr/app

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
# Copy the package.json file
COPY package.json .

# Install app dependencies
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
RUN npm install

# Bundle app source
COPY . .

# Expose app port from docker container
EXPOSE 3002
EXPOSE 8888
