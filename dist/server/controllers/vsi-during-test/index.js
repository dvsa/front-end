'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vsiDuringTest = require('./vsi-during-test');

Object.keys(_vsiDuringTest).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _vsiDuringTest[key];
    }
  });
});