'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllFilePathsWithinPath = exports.getDirectories = exports.isDirectory = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _nodeDir = require('node-dir');

var _nodeDir2 = _interopRequireDefault(_nodeDir);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const isDirectory = exports.isDirectory = source => _fs2.default.lstatSync(source).isDirectory();

const getDirectories = exports.getDirectories = source => {
  return _fs2.default.readdirSync(source).map(name => _path2.default.join(source, name)).filter(isDirectory);
};

const getAllFilePathsWithinPath = exports.getAllFilePathsWithinPath = async path => {
  // Creates a promise since the function uses a callback
  return new Promise((resolve, reject) => {
    _nodeDir2.default.paths(path, (err, paths) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(paths.files);
    });
  });
};