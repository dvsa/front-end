'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _setupMessages = require('./setupMessages');

Object.keys(_setupMessages).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _setupMessages[key];
    }
  });
});

var _isValidMessage = require('./isValidMessage');

Object.keys(_isValidMessage).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isValidMessage[key];
    }
  });
});

var _unpinSpecialNotice = require('./unpinSpecialNotice');

Object.keys(_unpinSpecialNotice).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _unpinSpecialNotice[key];
    }
  });
});