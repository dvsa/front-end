'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _motHistoryData = require('./mot-history-data');

Object.keys(_motHistoryData).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _motHistoryData[key];
    }
  });
});