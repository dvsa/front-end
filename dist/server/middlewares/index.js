'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _authentication = require('./authentication');

Object.keys(_authentication).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _authentication[key];
    }
  });
});

var _libraryNavigation = require('./libraryNavigation');

Object.keys(_libraryNavigation).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _libraryNavigation[key];
    }
  });
});

var _documentation = require('./documentation');

Object.keys(_documentation).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _documentation[key];
    }
  });
});