'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _prismCode = require('./prism-code');

Object.keys(_prismCode).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _prismCode[key];
    }
  });
});

var _directories = require('./directories');

Object.keys(_directories).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _directories[key];
    }
  });
});