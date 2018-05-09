'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addLibraryNavigationItemsToRequestObject = undefined;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _lodash = require('lodash');

var _constants = require('./../config/constants');

var _helpers = require('./../helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const addLibraryNavigationItemsToRequestObject = exports.addLibraryNavigationItemsToRequestObject = async (req, res, next) => {
  let currentRoute = req.path;
  let parentRoute = currentRoute.replace('/' + _path2.default.basename(req.path), '');

  let libraryFolderPaths = (0, _helpers.getDirectories)(_path2.default.join(_constants.CONFIG.paths.views.base, 'library'));
  let navigationItems = [];

  for (let i = 0; i < libraryFolderPaths.length; i++) {
    let currentPath = libraryFolderPaths[i];
    let foldername = _path2.default.basename(currentPath);
    let fileRouteName = currentPath.replace(_constants.CONFIG.paths.views.base, '');
    let filePathsWithinCurrentFolder = await (0, _helpers.getAllFilePathsWithinPath)(currentPath);
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
};