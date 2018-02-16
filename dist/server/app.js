'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startApp = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _memorystore = require('memorystore');

var _memorystore2 = _interopRequireDefault(_memorystore);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _nunjucks = require('nunjucks');

var _nunjucks2 = _interopRequireDefault(_nunjucks);

var _nodeDir = require('node-dir');

var _nodeDir2 = _interopRequireDefault(_nodeDir);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _etag = require('etag');

var _etag2 = _interopRequireDefault(_etag);

var _expressMinifyHtml = require('express-minify-html');

var _expressMinifyHtml2 = _interopRequireDefault(_expressMinifyHtml);

var _helmet = require('helmet');

var _helmet2 = _interopRequireDefault(_helmet);

var _errorhandler = require('errorhandler');

var _errorhandler2 = _interopRequireDefault(_errorhandler);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _routes = require('./config/routes');

var _constants = require('./config/constants');

var _libraryNavigation = require('./middlewares/libraryNavigation');

var _helpers = require('./helpers');

var Helpers = _interopRequireWildcard(_helpers);

var _package = require('./../../package.json');

var REPO_PACKAGE_JSON = _interopRequireWildcard(_package);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const startApp = exports.startApp = async () => {
  // Create express server
  const app = (0, _express2.default)();

  // Create nunjucks fileloader instance for the views folder
  const nunjucksFileLoader = new _nunjucks2.default.FileSystemLoader(_path2.default.resolve('src', 'server', 'views'), {
    noCache: true
  });

  // Create a nunjucks instance to be used for the view engine
  // This instance can be used to add filters and globals
  let env = new _nunjucks2.default.Environment(nunjucksFileLoader, {
    autoescape: false,
    web: {
      useCache: false
    }
  });

  // Add custom prism filter
  // Converts html to prism highlighted syntax
  // This can be used to display the code inside of the view templates
  env.addFilter('prism', Helpers.wrapCodeWithPreviwAndPrism);
  env.addFilter('prismFullpage', Helpers.wrapCodeWithPrismForFullPagePreview);

  // Add lodash as a global for view templates
  env.addGlobal('_', _lodash2.default);

  // Add app url as global
  env.addGlobal('appURL', _constants.CONFIG.appURL);

  // Add package json contents as gloabl
  env.addGlobal('repoPackageJSON', REPO_PACKAGE_JSON);

  // Loops through views/parials folder and get full path for each file
  const getMacroFilePaths = async () => {
    // Creates a promise since the function uses a callback
    return new Promise((resolve, reject) => {
      _nodeDir2.default.paths(_path2.default.resolve(_constants.CONFIG.paths.views.base, 'macros'), (err, paths) => {
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
  env.addGlobal('macroFilePaths', (await getMacroFilePaths()));

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
    return (0, _etag2.default)(body, encoding);
  });

  app.use(_libraryNavigation.addLibraryNavigationItemsToRequestObject);

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
  app.use((0, _helmet2.default)());

  // Enable GZip Compression
  app.use((0, _compression2.default)());

  // Logger middleware
  // Outputs all http requests and responses
  if (!(0, _constants.isTesting)()) {
    app.use((0, _morgan2.default)('dev'));
  }

  // Memory store created for production use
  // See: https://www.npmjs.com/package/memorystore
  const MemoryStore = (0, _memorystore2.default)(_expressSession2.default);

  // Express session middleware
  // Website: https://www.npmjs.com/package/express-session
  app.use((0, _expressSession2.default)({
    resave: true,
    saveUninitialized: true,
    secret: _constants.CONFIG.sessionSecret,
    cookie: {
      store: new MemoryStore({
        // prune expired entries every 24h
        checkPeriod: 86400000
      }),
      // 20 minutes
      maxAge: 1200000
    }
  }));

  // Static folder
  app.use(_express2.default.static(_constants.CONFIG.paths.publicAssets));

  // Body parsing middleware
  // Website: https://www.npmjs.com/package/body-parser
  app.use(_bodyParser2.default.json());
  app.use(_bodyParser2.default.urlencoded({ extended: true }));

  // Error handling for development
  if ((0, _constants.isDevelopment)()) {
    app.use((0, _errorhandler2.default)());
  }

  // Routes
  app.use('/', _routes.allRoutes);

  // Start HTTP server
  app.listen(_constants.CONFIG.port, () => {
    if (!(0, _constants.isTesting)()) {
      console.log(`
        Port: ${_constants.CONFIG.port} 
        Env: ${app.get('env')}
      `);
    }
  });
};