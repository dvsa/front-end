import fs from 'fs';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import flash from 'connect-flash';
import memoryStore from 'memorystore';
import morgan from 'morgan';
import nunjucks from 'nunjucks';
import nodeDir from 'node-dir';
import compression from 'compression';
import etag from 'etag';
import minifyHTML from 'express-minify-html';
import helmet from 'helmet';
import errorhandler from 'errorhandler';
import _ from 'lodash';

import { allRoutes } from './config/routes';
import { CONFIG, isDevelopment, isTesting } from './config/constants';
import * as Middlewares from './middlewares';
import * as Helpers from './helpers';
import * as REPO_PACKAGE_JSON from './../../package.json';

export const startApp = async () => {
  // Create express server
  const app = express();

  // Create nunjucks fileloader instance for the views folder
  const nunjucksFileLoader = new nunjucks.FileSystemLoader(path.resolve('src', 'server', 'views'), {
    noCache: true,
  });

  // Create a nunjucks instance to be used for the view engine
  // This instance can be used to add filters and globals
  let env = new nunjucks.Environment(nunjucksFileLoader, {
    autoescape: false,
    web: {
      useCache: false,
    },
  });

  // Add custom prism filter
  // Converts html to prism highlighted syntax
  // This can be used to display the code inside of the view templates
  env.addFilter('prism', Helpers.wrapCodeWithPreviwAndPrism);
  env.addFilter('prismFullpage', Helpers.wrapCodeWithPrismForFullPagePreview);

  // Add lodash as a global for view templates
  env.addGlobal('_', _);

  // Add app url as global
  env.addGlobal('appURL', CONFIG.appURL);

  // Add package json contents as gloabl
  env.addGlobal('repoPackageJSON', REPO_PACKAGE_JSON);

  // Loops through views/parials folder and get full path for each file
  const getMacroFilePaths = async () => {
    // Creates a promise since the function uses a callback
    return new Promise((resolve, reject) => {
      nodeDir.paths(path.resolve(CONFIG.paths.views.base, 'macros'), (err, paths) => {
        // Handles error
        if (err) {
          // Returns a reject promise response
          return reject(err);
        }
        // Returns a resolved promise resonse
        return resolve(paths.files);
      });
    });
  };

  // Add all macro file paths to be accessible inside view templates
  env.addGlobal('macroFilePaths', await getMacroFilePaths());

  // Add express to the nunjucks enviroment instance
  env.express(app);

  // Create a view engine from nunjucks enviroment variable
  app.engine('njk', env.render);

  // Set the express view engine to the above created view engine
  app.set('view engine', 'njk');
  app.set('view cache', false);

  // Disable powered by express in header
  app.set('x-powered-by', false);

  // Add eTag for files
  // This is used for caching in modern browsers
  // The eTag hash is generated from the file content
  // So if the file changes, the hash is also changed which clears the current cache
  app.set('etag', (body, encoding) => {
    return etag(body, encoding);
  });

  app.use(Middlewares.addLibraryNavigationItemsToRequestObject);

  // Enable HTML Compression
  // Website: https://www.npmjs.com/package/express-minify-html
  // app.use(
  //   minifyHTML({
  //     override: true,
  //     exception_url: false,
  //     htmlMinifier: {
  //       removeComments: true,
  //     },
  //   })
  // );

  // Add production middleware
  if (!isDevelopment()) {
    // Helmet middleware
    // https://helmetjs.github.io/
    app.use(helmet());

    // Remove powered by express
    // for security reasons
    app.disable('x-powered-by');
    
  }

  // Enable GZip Compression
  app.use(compression());

  // Logger middleware
  // Outputs all http requests and responses
  if (!isTesting()) {
    app.use(morgan('dev'));
  }

  // Memory store created for production use
  // See: https://www.npmjs.com/package/memorystore
  const MemoryStore = memoryStore(session);

  // Express session middleware
  // Website: https://www.npmjs.com/package/express-session
  app.use(
    session({
      resave: true,
      saveUninitialized: true,
      secret: CONFIG.sessionSecret,
      cookie: {
        store: new MemoryStore({
          // prune expired entries every 24h
          checkPeriod: 86400000,
        }),
        // 20 minutes
        maxAge: 1200000,
      },
    })
  );

  // Express flash messaging middleware
  // https://www.npmjs.com/package/connect-flash
  app.use(flash());

  // Static folder
  app.use(express.static(CONFIG.paths.publicAssets));

  // Body parsing middleware
  // Website: https://www.npmjs.com/package/body-parser
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // Error handling for development
  if (isDevelopment()) {
    app.use(errorhandler());
  }

  // Routes
  app.use('/', allRoutes);

  // Start HTTP server
  app.listen(CONFIG.port, () => {
    if (!isTesting()) {
      console.log(`
        Port: ${CONFIG.port} 
        Env: ${app.get('env')}
      `);
    }
  });
};
