"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _authentication = require("./authentication");
Object.keys(_authentication).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _authentication[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _authentication[key];
    }
  });
});
var _libraryNavigation = require("./libraryNavigation");
Object.keys(_libraryNavigation).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _libraryNavigation[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _libraryNavigation[key];
    }
  });
});