'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _middleware = require('./middleware');

Object.keys(_middleware).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _middleware[key];
    }
  });
});

var _router = require('./router');

Object.keys(_router).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _router[key];
    }
  });
});