'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.libraryNavgiationItems = undefined;

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

// Library Routes
let libraryNavgiationItems = exports.libraryNavgiationItems = (() => {
  var _ref = _asyncToGenerator(function* (req, res, next) {
    let viewData = {
      pageTitle: 'Library',
      loggedOut: true,
      designSystem: true
    };

    let libraryFolderPaths = getDirectories(_path2.default.join(_constants.CONFIG.paths.views.base, 'library'));
    let navigationItems = [];

    for (let i = 0; i < libraryFolderPaths.length; i++) {
      let currentPath = libraryFolderPaths[i];
      let foldername = _path2.default.basename(currentPath);
      let fileRouteName = currentPath.replace(_constants.CONFIG.paths.views.base, '');
      let filePathsWithinCurrentFolder = yield getAllFilePathsWithinPath(currentPath);
      let subItems = [];

      for (let i = 0; i < filePathsWithinCurrentFolder.length; i++) {
        let filepath = filePathsWithinCurrentFolder[i];
        if (filepath.indexOf('index.njk') != -1) continue;
        let parsedPath = _path2.default.parse(filepath);
        // let fileRouteName = filepath.replace(currentPath, '');
        let routeLink = fileRouteName + '/' + parsedPath.name;
        subItems.push({
          name: (0, _lodash.upperFirst)(parsedPath.name),
          link: routeLink,
          active: false
        });
      }

      navigationItems.push({
        name: (0, _lodash.upperFirst)(foldername),
        link: fileRouteName,
        active: false,
        subItems
      });
    }

    req.libraryNavgiationItems = navigationItems;
    next();
  });

  return function libraryNavgiationItems(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();