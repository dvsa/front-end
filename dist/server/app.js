"use strict";

require("core-js/modules/esnext.weak-map.delete-all.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startApp = void 0;
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _express = _interopRequireDefault(require("express"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _expressSession = _interopRequireDefault(require("express-session"));
var _connectFlash = _interopRequireDefault(require("connect-flash"));
var _memorystore = _interopRequireDefault(require("memorystore"));
var _morgan = _interopRequireDefault(require("morgan"));
var _nunjucks = _interopRequireDefault(require("nunjucks"));
var _nodeDir = _interopRequireDefault(require("node-dir"));
var _compression = _interopRequireDefault(require("compression"));
var _etag = _interopRequireDefault(require("etag"));
var _expressMinifyHtml = _interopRequireDefault(require("express-minify-html"));
var _helmet = _interopRequireDefault(require("helmet"));
var _errorhandler = _interopRequireDefault(require("errorhandler"));
var _lodash = _interopRequireDefault(require("lodash"));
var _routes = require("./config/routes");
var _constants = require("./config/constants");
var Middlewares = _interopRequireWildcard(require("./middlewares"));
var Helpers = _interopRequireWildcard(require("./helpers"));
var REPO_PACKAGE_JSON = _interopRequireWildcard(require("./../../package.json"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const startApp = async () => {
  // Create express server
  const app = (0, _express.default)();

  // Create nunjucks fileloader instance for the views folder
  const nunjucksFileLoader = new _nunjucks.default.FileSystemLoader(_path.default.resolve('src', 'server', 'views'), {
    noCache: true
  });

  // Create a nunjucks instance to be used for the view engine
  // This instance can be used to add filters and globals
  let env = new _nunjucks.default.Environment(nunjucksFileLoader, {
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
  env.addGlobal('_', _lodash.default);

  // Add app url as global
  env.addGlobal('appURL', _constants.CONFIG.appURL);

  // Add package json contents as gloabl
  env.addGlobal('repoPackageJSON', REPO_PACKAGE_JSON);

  // Loops through views/parials folder and get full path for each file
  const getMacroFilePaths = async () => {
    // Creates a promise since the function uses a callback
    return new Promise((resolve, reject) => {
      _nodeDir.default.paths(_path.default.resolve(_constants.CONFIG.paths.views.base, 'macros'), (err, paths) => {
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
    return (0, _etag.default)(body, encoding);
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
  if (!(0, _constants.isDevelopment)()) {
    // Helmet middleware
    // https://helmetjs.github.io/
    app.use((0, _helmet.default)());

    // Remove powered by express
    // for security reasons
    app.disable('x-powered-by');
  }

  // Enable GZip Compression
  app.use((0, _compression.default)());

  // Logger middleware
  // Outputs all http requests and responses
  if (!(0, _constants.isTesting)()) {
    app.use((0, _morgan.default)('dev'));
  }

  // Memory store created for production use
  // See: https://www.npmjs.com/package/memorystore
  const MemoryStore = (0, _memorystore.default)(_expressSession.default);

  // Express session middleware
  // Website: https://www.npmjs.com/package/express-session
  app.use((0, _expressSession.default)({
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

  // Express flash messaging middleware
  // https://www.npmjs.com/package/connect-flash
  app.use((0, _connectFlash.default)());

  // Static folder
  app.use(_express.default.static(_constants.CONFIG.paths.publicAssets));

  // Body parsing middleware
  // Website: https://www.npmjs.com/package/body-parser
  app.use(_bodyParser.default.json());
  app.use(_bodyParser.default.urlencoded({
    extended: true
  }));

  // Error handling for development
  if ((0, _constants.isDevelopment)()) {
    app.use((0, _errorhandler.default)());
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
exports.startApp = startApp;