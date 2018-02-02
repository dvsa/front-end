## Demo

You can view a live demo here:

[Heroku Demo](https://dvsa-front-end.herokuapp.com/)

## Docker setup for development

**You will need the latest version of docker installed**

For faster development you can use docker by running the following command:

```
docker-compose up
```

#### Remove container

```
docker-compose down
```

#### Rebuld container

```
docker-compose build
````

This can be done after adding a new npm package for example.

## Local Setup

### Prerequisite

1. Clone this repo and cd into the directory using terminal

2. Install dependencies using NPM

```javascript
npm install
```

### Development

To run development mode run the following command inside the directory.

```javascript
npm run start-dev
```

You can access the local server with the following url

```
http://localhost:3002
```

It will automatically run the following processess concurrently

* gulp start-dev task
* webpack with development configurations
* express application with nodemon


## Build Production

Build production command will generate production ready assets and node js server code.

The productions assets are located in the **dist/assets** folder and the server code is located in the **dist/server** folder.

```javascript
npm run build-production
```

**Run this command and commit changes before pushing to heroku.**

## Front-end Assets

## Images

All images will be placed inside of the 'public/images' folder for production. Each image will also be compressed using imagemin.

## Javascript

All javascript files will be placed inside of the 'public/javascripts' folder for production. Each file is uglified for optimal performance.

### IE Shims Bundle

The file named **ie-shims.bundle.js** contains polyfills to make IE8 work as expected. It allows support for HTML5 and other basic features.

### DVSA Bundle

The file named **dvsa.bundle.js** contains all of the new ES6 javascript bundled using webpack. It is also transpiled uisng babel-loader to allow ES5 browser compatibility. This can be loaded right at the end of the page before body tag and can be defered.