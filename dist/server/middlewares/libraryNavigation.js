'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addLibraryNavigationItemsToRequestObject = exports.getAllFilePathsWithinPath = exports.getDirectories = exports.isDirectory = undefined;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _nodeDir = require('node-dir');

var _nodeDir2 = _interopRequireDefault(_nodeDir);

var _lodash = require('lodash');

var _constants = require('./../config/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const isDirectory = exports.isDirectory = source => _fs2.default.lstatSync(source).isDirectory();

const getDirectories = exports.getDirectories = source => {
  return _fs2.default.readdirSync(source).map(name => _path2.default.join(source, name)).filter(isDirectory);
};

const getAllFilePathsWithinPath = exports.getAllFilePathsWithinPath = (() => {
  var _ref = _asyncToGenerator(function* (path) {
    // Creates a promise since the function uses a callback
    return new Promise(function (resolve, reject) {
      _nodeDir2.default.paths(path, function (err, paths) {
        if (err) {
          reject(err);
          return;
        }
        resolve(paths.files);
      });
    });
  });

  return function getAllFilePathsWithinPath(_x) {
    return _ref.apply(this, arguments);
  };
})();

const addLibraryNavigationItemsToRequestObject = exports.addLibraryNavigationItemsToRequestObject = (() => {
  var _ref2 = _asyncToGenerator(function* (req, res, next) {
    let currentRoute = req.path;
    let parentRoute = currentRoute.replace('/' + _path2.default.basename(req.path), '');

    let libraryFolderPaths = getDirectories(_path2.default.join(_constants.CONFIG.paths.views.base, 'library'));
    let navigationItems = [];

    for (let i = 0; i < libraryFolderPaths.length; i++) {
      let currentPath = libraryFolderPaths[i];
      let foldername = _path2.default.basename(currentPath);
      let fileRouteName = currentPath.replace(_constants.CONFIG.paths.views.base, '');
      let filePathsWithinCurrentFolder = yield getAllFilePathsWithinPath(currentPath);
      let subItems = [];

      let parentActive = false;

      if (fileRouteName == req.path || fileRouteName + '/' == req.path || fileRouteName + '/index' == req.path) {
        parentActive = true;
      }

      for (let i = 0; i < filePathsWithinCurrentFolder.length; i++) {
        let filepath = filePathsWithinCurrentFolder[i];
        if (filepath.indexOf('index.njk') != -1) continue;
        let parsedPath = _path2.default.parse(filepath);
        let routeLink = fileRouteName + '/' + parsedPath.name;
        let parentPath = req.path.replace('/' + parsedPath.name, '');

        if (parentPath == fileRouteName) {
          parentActive = true;
        }

        subItems.push({
          name: (0, _lodash.startCase)(parsedPath.name),
          link: routeLink,
          viewFile: filepath,
          active: routeLink == req.path,
          parentPath
        });
      }

      navigationItems.push({
        name: (0, _lodash.startCase)(foldername),
        link: fileRouteName,
        active: parentActive,
        viewFile: _path2.default.join(currentPath, 'index.njk'),
        subItems
      });
    }

    req.libraryNavgiationItems = navigationItems;

    next();
  });

  return function addLibraryNavigationItemsToRequestObject(_x2, _x3, _x4) {
    return _ref2.apply(this, arguments);
  };
})();