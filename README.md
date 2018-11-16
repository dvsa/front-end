## Demo

You can view the MOT component library and prototypes here:

[Heroku Demo](https://dvsa-front-end.herokuapp.com/)

## Login credentials

If you'd like to access the [Prototypes pages](https://dvsa-front-end.herokuapp.com/prototpes), log in as below.
The prototype system is password protected to prevent users accidentally accessing what may look like a real Government Service.

User: admin  
Password: dvsa  


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

## Docker setup for development

**You will need the latest version of docker installed**

### Running development mode

For faster development you can use docker by running the following command:

```
docker-compose up
```

After which the server is located at the local address below:

```
http://localhost:3002
```

### Building production assets

Run the following command

```
docker-compose run --rm app npm run build-production
```
