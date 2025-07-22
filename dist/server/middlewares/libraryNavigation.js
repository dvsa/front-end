"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isDirectory = exports.getDirectories = exports.getAllFilePathsWithinPath = exports.addLibraryNavigationItemsToRequestObject = void 0;
var _path = _interopRequireDefault(require("path"));
var _fs = _interopRequireDefault(require("fs"));
var _nodeDir = _interopRequireDefault(require("node-dir"));
var _lodash = require("lodash");
var _constants = require("./../config/constants");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var isDirectory = exports.isDirectory = function isDirectory(source) {
  return _fs["default"].lstatSync(source).isDirectory();
};
var getDirectories = exports.getDirectories = function getDirectories(source) {
  return _fs["default"].readdirSync(source).map(function (name) {
    return _path["default"].join(source, name);
  }).filter(isDirectory);
};
var getAllFilePathsWithinPath = exports.getAllFilePathsWithinPath = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(path) {
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          return _context.a(2, new Promise(function (resolve, reject) {
            _nodeDir["default"].paths(path, function (err, paths) {
              if (err) {
                reject(err);
                return;
              }
              resolve(paths.files);
            });
          }));
      }
    }, _callee);
  }));
  return function getAllFilePathsWithinPath(_x) {
    return _ref.apply(this, arguments);
  };
}();
var addLibraryNavigationItemsToRequestObject = exports.addLibraryNavigationItemsToRequestObject = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res, next) {
    var currentRoute, parentRoute, libraryFolderPaths, navigationItems, i, currentPath, foldername, fileRouteName, filePathsWithinCurrentFolder, subItems, parentActive, _i, filepath, parsedPath, routeLink, parentPath;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          currentRoute = req.path;
          parentRoute = currentRoute.replace('/' + _path["default"].basename(req.path), '');
          libraryFolderPaths = getDirectories(_path["default"].join(_constants.CONFIG.paths.views.base, 'library'));
          navigationItems = [];
          i = 0;
        case 1:
          if (!(i < libraryFolderPaths.length)) {
            _context2.n = 8;
            break;
          }
          currentPath = libraryFolderPaths[i];
          foldername = _path["default"].basename(currentPath);
          fileRouteName = currentPath.replace(_constants.CONFIG.paths.views.base, '');
          _context2.n = 2;
          return getAllFilePathsWithinPath(currentPath);
        case 2:
          filePathsWithinCurrentFolder = _context2.v;
          subItems = [];
          parentActive = false;
          if (fileRouteName == req.path || fileRouteName + '/' == req.path || fileRouteName + '/index' == req.path) {
            parentActive = true;
          }
          _i = 0;
        case 3:
          if (!(_i < filePathsWithinCurrentFolder.length)) {
            _context2.n = 6;
            break;
          }
          filepath = filePathsWithinCurrentFolder[_i];
          if (!(filepath.indexOf('index.njk') != -1)) {
            _context2.n = 4;
            break;
          }
          return _context2.a(3, 5);
        case 4:
          parsedPath = _path["default"].parse(filepath);
          routeLink = fileRouteName + '/' + parsedPath.name;
          parentPath = req.path.replace('/' + parsedPath.name, '');
          if (parentPath == fileRouteName) {
            parentActive = true;
          }
          subItems.push({
            name: (0, _lodash.startCase)(parsedPath.name),
            link: routeLink,
            viewFile: filepath,
            active: routeLink == req.path,
            parentPath: parentPath
          });
        case 5:
          _i++;
          _context2.n = 3;
          break;
        case 6:
          navigationItems.push({
            name: (0, _lodash.startCase)(foldername),
            link: fileRouteName,
            active: parentActive,
            viewFile: _path["default"].join(currentPath, 'index.njk'),
            subItems: subItems
          });
        case 7:
          i++;
          _context2.n = 1;
          break;
        case 8:
          req.libraryNavgiationItems = navigationItems;
          next();
        case 9:
          return _context2.a(2);
      }
    }, _callee2);
  }));
  return function addLibraryNavigationItemsToRequestObject(_x2, _x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();