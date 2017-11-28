'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CONFIG = exports.isTesting = exports.isDevelopment = exports.SRC_PATH = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const SRC_PATH = exports.SRC_PATH = _path2.default.resolve('src', 'server');

const isDevelopment = exports.isDevelopment = () => {
  return process.env.NODE_ENV == 'development';
};

const isTesting = exports.isTesting = () => {
  return process.env.NODE_ENV == 'testing';
};

let config = {
  port: process.env.PORT || 3002,
  sessionSecret: 'secret',
  appURL: 'https://dvsa-front-end.herokuapp.com',
  paths: {
    src: SRC_PATH,
    views: {
      base: _path2.default.join(SRC_PATH, 'views')
    },
    assets: _path2.default.join(SRC_PATH, 'assets'),
    data: _path2.default.join(SRC_PATH, 'data'),
    publicAssets: isDevelopment() ? _path2.default.resolve('public') : _path2.default.resolve('dist', 'assets')
  }
};

if (isDevelopment()) {
  config = _extends({}, config, {
    appURL: `http://localhost:${config.port}`
  });
}

const CONFIG = exports.CONFIG = config;