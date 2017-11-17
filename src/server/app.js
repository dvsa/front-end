import fs from 'fs';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import morgan from 'morgan';
import nunjucks from 'nunjucks';
import Prism from 'prismjs';
import Normalizer from 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace';
import nodeDir from 'node-dir';
import compression from 'compression';
import etag from 'etag';
import minifyHTML from 'express-minify-html';
import helmet from 'helmet';
import pretty from 'pretty';
import { minify } from 'html-minifier';
import errorhandler from 'errorhandler';
import _ from 'lodash';

import { allRoutes } from './config/routes';
import CONFIG from './config/constants';
import { addLibraryNavigationItemsToRequestObject } from './middlewares/libraryNavigation';

export const startApp = async () => {
  // Create express server
  const app = express();

  // Create nunjucks fileloader instance for the views folder
  const nunjucksFileLoader = new nunjucks.FileSystemLoader(path.join(__dirname, 'views'), {
    noCache: true,
  });

  // Create a nunkucks instance to be used for the view engine
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
  env.addFilter('prism', code => {
    let nw = new Normalizer({
      'remove-trailing': true,
      'remove-indent': false,
      'left-trim': true,
      'right-trim': true,
    });

    // Minifies the html code
    // This is done to normalize it before making it pretty
    let cleanHTML = minify(code, {
      html5: true,
      collapseWhitespace: true,
      preserveLineBreaks: true,
    });

    // Normalize the html code to Prism standards
    let normalizedCode = nw.normalize(cleanHTML);

    // Make the HTML code pretty
    let prettyCode = pretty(normalizedCode);

    // Highlight the code using prismjs
    let highlightedCode = Prism.highlight(prettyCode, Prism.languages.markup);

    // Create the developer preview output
    let preview = `<div class="dev-preview__example">${code}</div>`;

    // Create the code highlighting output
    let prismCode = `<pre><code class="line-numbers language-html">${highlightedCode}</code></pre>`;

    // Return the new HTML
    // Combination of the preview and prism code highlighting
    return `
      <!-- dev-preview -->
      <div class="dev-preview">
        ${preview}
        ${prismCode}
      </div>
      <!-- /dev-preview -->
    `;
  });

  // Add lodash as a global for view templates
  env.addGlobal('_', _);

  // Add app url as global
  env.addGlobal('appURL', CONFIG.appURL);

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

  app.use(addLibraryNavigationItemsToRequestObject);

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

  // Enables security middleware
  // Website: https://helmetjs.github.io/
  app.use(helmet());

  // Enable GZip Compression
  app.use(compression());

  // Logger middleware
  // Outputs all http requests and responses
  if (process.env.NODE_ENV != 'testing') {
    app.use(morgan('dev'));
  }

  // Express session middleware
  // Website: https://www.npmjs.com/package/express-session
  app.use(
    session({
      resave: true,
      saveUninitialized: true,
      secret: CONFIG.sessionSecret,
    })
  );

  // Static folder
  app.use(express.static(path.resolve('public')));

  // Body parsing middleware
  // Website: https://www.npmjs.com/package/body-parser
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // Error handling for development
  if (process.env.NODE_ENV == 'development') {
    app.use(errorhandler());
  }

  // Routes
  app.use('/', allRoutes);

  // Start HTTP server
  app.listen(CONFIG.port, () => {
    if (process.env.NODE_ENV != 'testing') {
      console.log(`
        Port: ${CONFIG.port} 
        Env: ${app.get('env')}
      `);
    }
  });
};
