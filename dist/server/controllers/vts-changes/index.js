"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _vtsChanges = require("./vts-changes");
Object.keys(_vtsChanges).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _vtsChanges[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _vtsChanges[key];
    }
  });
});