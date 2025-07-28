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
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const isDirectory = source => _fs.default.lstatSync(source).isDirectory();
exports.isDirectory = isDirectory;
const getDirectories = source => {
  return _fs.default.readdirSync(source).map(name => _path.default.join(source, name)).filter(isDirectory);
};
exports.getDirectories = getDirectories;
const getAllFilePathsWithinPath = async path => {
  // Creates a promise since the function uses a callback
  return new Promise((resolve, reject) => {
    _nodeDir.default.paths(path, (err, paths) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(paths.files);
    });
  });
};
exports.getAllFilePathsWithinPath = getAllFilePathsWithinPath;
const addLibraryNavigationItemsToRequestObject = async (req, res, next) => {
  let currentRoute = req.path;
  let parentRoute = currentRoute.replace('/' + _path.default.basename(req.path), '');
  let libraryFolderPaths = getDirectories(_path.default.join(_constants.CONFIG.paths.views.base, 'library'));
  let navigationItems = [];
  for (let i = 0; i < libraryFolderPaths.length; i++) {
    let currentPath = libraryFolderPaths[i];
    let foldername = _path.default.basename(currentPath);
    let fileRouteName = currentPath.replace(_constants.CONFIG.paths.views.base, '');
    let filePathsWithinCurrentFolder = await getAllFilePathsWithinPath(currentPath);
    let subItems = [];
    let parentActive = false;
    if (fileRouteName == req.path || fileRouteName + '/' == req.path || fileRouteName + '/index' == req.path) {
      parentActive = true;
    }
    for (let i = 0; i < filePathsWithinCurrentFolder.length; i++) {
      let filepath = filePathsWithinCurrentFolder[i];
      if (filepath.indexOf('index.njk') != -1) continue;
      let parsedPath = _path.default.parse(filepath);
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
      viewFile: _path.default.join(currentPath, 'index.njk'),
      subItems
    });
  }
  req.libraryNavgiationItems = navigationItems;
  next();
};
exports.addLibraryNavigationItemsToRequestObject = addLibraryNavigationItemsToRequestObject;