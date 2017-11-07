# mot/mot-new-wfa
---
## Documentation (WIP)

New version of WFA for public-facing DVSA/MOT "micro" sites such as MOTH

### Before you start
 - install [Node](https://nodejs.org/en/), we're using ```6.11.1``` to be compatible with Heroku requirements but in reality if you have higher installed you should be fine. You shouldn't need to install [Node Package Manager (npm)](https://www.npmjs.com/) as it comes bundled with later versions of Node
 - if not, install [Node Version Manager (nvm)](https://github.com/creationix/nvm) and set it two the above version
 - install the [heroku toolbelt](https://devcenter.heroku.com/articles/heroku-cli) - it's mega!
 - install Git (maybe Xcode as well if you need to)
 - get access to [Gitlab](https://gitlab.motdev.org.uk) (you could try asking devops?)
 - get yourself added to the correct repo, [https://gitlab.motdev.org.uk/mot/mot-new-wfa](https://gitlab.motdev.org.uk/mot/mot-new-wfa) (ditto)
 - install [Ruby](https://www.ruby-lang.org/en/documentation/installation/#homebrew) as we use a couple of Gems
 - install [Grunt](https://gruntjs.com/getting-started) and it's CLI
 - just install anything else that tickles your fancy while you're at it. Maybe a new bathroom suite.
 
  
### Setup your local environment
 - Get the repo, put it wherever you like, probably _outside_ of the MOTDEV folders would be best.

```
$ git clone git@gitlab.motdev.org.uk:mot/mot-new-wfa.git
$ git checkout master
$ git pull
$ npm install
$ node app.js
```
If you wish to use node monitor to restart the app when saving changes in the web root file system then:
- install nodemon (globally) ```npm install nodemon -g```
- run the app from the app root using, ```nodemon app.js```


After starting the app you can access locally via the URL: 

[http://localhost:3008](http://localhost:3008)

### GDS source 

All the new GDS stuff is in the ```mot-new-wfa/source/scss/gds``` folder. It's dropped in there from the Gov Prototyping Kit:
[https://github.com/alphagov/govuk_prototype_kit](https://github.com/alphagov/govuk_prototype_kit)
[https://govuk-prototype-kit.herokuapp.com/docs](https://govuk-prototype-kit.herokuapp.com/docs) 

In it's original GDS state, it's unusable, so it's re-bundled into a more consumable/deliverable state.

If you need to drop updated GDS stuff in there, then drop the necessaries into the folder (obv in a new branch, just in case).

#### Gotchas

- **Whimsical GDS** If you do update stuff from GDS, do it in a branch, check to see if there's a change log with the GDS update. GDS are liable to change anything, at any time, on whim.
- govuk SCSS partials/source files are lifted directly form the govuk_modules folder - there's no point chucking them all directly in our own source folder - only "static" files are moved. 
- Everything has been moved off Grunt and thus we don't have a Ruby dependency for ```scss_lint``` This isn't a a gotcha relaly, I'm jus sayin'. 

### Dev stuff

- abstract your SCSS into partials
- nest your BEM with ampersands
- use BEM for all custom stuff (GDS don't and GDS should)
- Use 4 spaces and not tabs for indents
- Comments are handy for "unusual" stuff, but don't overdo it - they're ripped out on compile anyway so don't worry about page weight etc
- Never work in master branch unless you know how to backtrack. 
- Branches are cool anyway, create a merge request and get someone to check it if you're not sure
- Create separate controllers for stuff in Node, massive pages of routes and whatnot are a pain to read
- Use the Node templates where available, such as breadcrumbs, headings etc. If one isn't quite flexible enough, then change it, but to work for everything. If that gets too complicated and you have a justified use case for a new one, go ahead and make one. 


# New Features Branch

## Demo

You can view a live demo here:

[Heroku Demo](https://mot-new-wfa2.herokuapp.com/)

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

### Vendor Bundle

The file named **vendor.bundle.js** contains all of the javascript assets provided by GOVUK. It also includes any third-party shims or polyfills. It must be included above head tag.

### MOT Bundle

The file named **mot.bundle.js** contains all of the new ES6 javascript bundled using webpack. It is also transpiled uisng babel-loader to allow ES5 browser compatibility. This can be loaded right at the end of the page before body tag and can be defered.