## Demo

You can view a live demo here:

[Heroku Demo](https://dvsa-front-end.herokuapp.com/)

## Setup

### Prerequisite

1. Clone this repo and cd into the directory using terminal

2. Install dependencies using NPM

```javascript
npm install
```

### Development

To run development mode run the following command inside the directory

```javascript
npm run start-dev
```

It will automatically run the following processess concurrently

* gulp start-dev task
* webpack with development configurations
* express application with nodemon


### Production

Production command will generate product ready frontend assets (images, javascripts, stylesheets) inside of the public folder.

```javascript
npm run build-production
```

## Front-end Assets

## Images

All images will be placed inside of the 'public/images' folder for production. Each image will also be compressed using imagemin.

## Javascript

All javascript files will be placed inside of the 'public/javascripts' folder for production. Each file is uglified for optimal performance.

### IE Shims Bundle

The file named **ie-shims.bundle.js** contains polyfills to make IE8 work as expected. It allows support for HTML5 and other basic features.

### DVSA Bundle

The file named **dvsa.bundle.js** contains all of the new ES6 javascript bundled using webpack. It is also transpiled uisng babel-loader to allow ES5 browser compatibility. This can be loaded right at the end of the page before body tag and can be defered.