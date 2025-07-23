"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
var _helmet = _interopRequireDefault(require("helmet"));
var _errorhandler = _interopRequireDefault(require("errorhandler"));
var _lodash = _interopRequireDefault(require("lodash"));
var _routes = require("./config/routes");
var _constants = require("./config/constants");
var Middlewares = _interopRequireWildcard(require("./middlewares"));
var Helpers = _interopRequireWildcard(require("./helpers"));
var REPO_PACKAGE_JSON = _interopRequireWildcard(require("./../../package.json"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t3 in e) "default" !== _t3 && {}.hasOwnProperty.call(e, _t3) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t3)) && (i.get || i.set) ? o(f, _t3, i) : f[_t3] = e[_t3]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var startApp = exports.startApp = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
    var app, nunjucksFileLoader, env, getMacroFilePaths, MemoryStore, _t, _t2;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          // Create express server
          app = (0, _express["default"])(); // Create nunjucks fileloader instance for the views folder
          nunjucksFileLoader = new _nunjucks["default"].FileSystemLoader(_path["default"].resolve('src', 'server', 'views'), {
            noCache: true
          }); // Create a nunjucks instance to be used for the view engine
          // This instance can be used to add filters and globals
          env = new _nunjucks["default"].Environment(nunjucksFileLoader, {
            autoescape: false,
            web: {
              useCache: false
            }
          }); // Add custom prism filter
          // Converts html to prism highlighted syntax
          // This can be used to display the code inside of the view templates
          env.addFilter('prism', Helpers.wrapCodeWithPreviwAndPrism);
          env.addFilter('prismFullpage', Helpers.wrapCodeWithPrismForFullPagePreview);

          // Add lodash as a global for view templates
          env.addGlobal('_', _lodash["default"]);

          // Add app url as global
          env.addGlobal('appURL', _constants.CONFIG.appURL);

          // Add package json contents as gloabl
          env.addGlobal('repoPackageJSON', REPO_PACKAGE_JSON);

          // Loops through views/parials folder and get full path for each file
          getMacroFilePaths = /*#__PURE__*/function () {
            var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
              return _regenerator().w(function (_context) {
                while (1) switch (_context.n) {
                  case 0:
                    return _context.a(2, new Promise(function (resolve, reject) {
                      _nodeDir["default"].paths(_path["default"].resolve(_constants.CONFIG.paths.views.base, 'macros'), function (err, paths) {
                        // Handles error
                        if (err) {
                          // Returns a reject promise response
                          return reject(err);
                        }
                        // Returns a resolved promise resonse
                        return resolve(paths.files);
                      });
                    }));
                }
              }, _callee);
            }));
            return function getMacroFilePaths() {
              return _ref2.apply(this, arguments);
            };
          }(); // Add all macro file paths to be accessible inside view templates
          _t = env;
          _context2.n = 1;
          return getMacroFilePaths();
        case 1:
          _t2 = _context2.v;
          _t.addGlobal.call(_t, 'macroFilePaths', _t2);
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
          app.set('etag', function (body, encoding) {
            return (0, _etag["default"])(body, encoding);
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
            app.use((0, _helmet["default"])());

            // Remove powered by express
            // for security reasons
            app.disable('x-powered-by');
          }

          // Enable GZip Compression
          app.use((0, _compression["default"])());

          // Logger middleware
          // Outputs all http requests and responses
          if (!(0, _constants.isTesting)()) {
            app.use((0, _morgan["default"])('dev'));
          }

          // Memory store created for production use
          // See: https://www.npmjs.com/package/memorystore
          MemoryStore = (0, _memorystore["default"])(_expressSession["default"]); // Express session middleware
          // Website: https://www.npmjs.com/package/express-session
          app.use((0, _expressSession["default"])({
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
          app.use((0, _connectFlash["default"])());

          // Static folder
          app.use(_express["default"]["static"](_constants.CONFIG.paths.publicAssets));

          // Body parsing middleware
          // Website: https://www.npmjs.com/package/body-parser
          app.use(_bodyParser["default"].json());
          app.use(_bodyParser["default"].urlencoded({
            extended: true
          }));

          // Error handling for development
          if ((0, _constants.isDevelopment)()) {
            app.use((0, _errorhandler["default"])());
          }

          // Routes
          app.use('/', _routes.allRoutes);

          // Start HTTP server
          app.listen(_constants.CONFIG.port, function () {
            if (!(0, _constants.isTesting)()) {
              console.log("\n        Port: ".concat(_constants.CONFIG.port, " \n        Env: ").concat(app.get('env'), "\n      "));
            }
          });
        case 2:
          return _context2.a(2);
      }
    }, _callee2);
  }));
  return function startApp() {
    return _ref.apply(this, arguments);
  };
}();