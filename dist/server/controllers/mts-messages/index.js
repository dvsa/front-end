"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _middleware = require("./middleware");
Object.keys(_middleware).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _middleware[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _middleware[key];
    }
  });
});
var _router = require("./router");
Object.keys(_router).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _router[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _router[key];
    }
  });
});