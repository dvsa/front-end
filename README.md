# Front-end
TEST
**Assets for [MTS](https://gitlab.mot.dvsacloud.uk/mot/mot).**

**Note:** Previously also used by [CVR](https://gitlab.mot.dvsacloud.uk/vehicle-recalls/recalls-app) / [MOTH](https://github.com/dvsa/mot-history) / [MOTR](https://github.com/dvsa/motr)

**IMPORTANT: NEVER UPDATE DIST FILES DIRECTLY!** They are generated from `/src` directory with `npm run build-production`.

## Localdev setup

**Requirements: Node.js "^12.16"**

1. Run `npm install` in the root directory of front-end
2. Make changes to your code. Update version tag in `package.json` and `composer.json`.
3. **LOCAL:** Build assets using `npm run build-production`. Changes will be reflected in `/dist` folder with new tag versions.
4. **DOCKER:** Build assets using 
```docker compose run app npm run build-production```
5. Refresh the page
NOTE:
   If you want to update the assets for MTS, the easiest way is to take the Styles.css file
   
   ```front-end/dist/assets/stylesheets/styles.css```
   and copy it's content to
   
  ```mot/mot-web-frontend/public/assets/stylesheets/styles.css``` 
   and then refresh the page.

For the old stylesheets:
1. Modify the relevant sass file under mot/mot-static
2. Run:
```sass app.scss app.scss```
   This will generate a new app.css which will contain your changes (even if you modified a different sass file
   such as buttons.scss in mot-static)
3. Copy the newly generated app.css file into```mot/mot-web-frontend/public/css/```
4. Refresh the page. 

## Deploy to Jenkins
1. Update front-end/composer.json with an incremented front-end version number.
2. Run composer update to update the composer.lock file   
3. Update package.json and package.lock with an incremented version number.
4. Commit your changes
5. Run ```git tag -a 1.5.x -m "Updated assets" ``` to tag your latest commit
6. Run ```git push origin 1.5.x``` to push the new asset version
7. Under web-frontend ~~/CVR/MOTH/MOTR~~ update the composer dependancy to point to the new version.
8. Run the Jenkins build.

Further details and guidance for using this kit for prototypes and releases for MTS can be found internally in Confluence by searching for front-end.

## Demo

~~You can view the MOT component library and prototypes here:~~

~~[Heroku Demo](https://dvsa-front-end.herokuapp.com/)~~

## Login credentials

~~If you'd like to access the [Prototypes pages](https://dvsa-front-end.herokuapp.com/prototypes), log in as below.
The prototype system is password protected to prevent users accidentally accessing what may look like a real Government Service.~~

~~User: admin~~  
~~Password: dvsa~~  


## OLD Local Setup 

### Prerequisite

1. Clone this repo and cd into the directory using terminal

2. Install dependencies using NPM

```shell
docker-compose run app npm install
```

### Development

To run development mode run the following command inside the directory.

```shell
docker-compose up
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

```shell
docker-compose run app npm run build-production
```

**Run this command and commit changes before pushing to heroku.**

## Docker setup for development

**You will need the latest version of docker installed**

### Running development mode

For faster development you can use docker by running the following command:

```shell
docker-compose up
```

After which the server is located at the local address below:

```
http://localhost:3002
```

### Building production assets

Run the following command

```shell
docker-compose run --rm app npm run build-production
```
