"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _vsiDuringTest = require("./vsi-during-test");
Object.keys(_vsiDuringTest).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _vsiDuringTest[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _vsiDuringTest[key];
    }
  });
});