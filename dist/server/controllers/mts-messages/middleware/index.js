"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _setupMessages = require("./setupMessages");
Object.keys(_setupMessages).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _setupMessages[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _setupMessages[key];
    }
  });
});
var _isValidMessage = require("./isValidMessage");
Object.keys(_isValidMessage).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _isValidMessage[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _isValidMessage[key];
    }
  });
});
var _unpinSpecialNotice = require("./unpinSpecialNotice");
Object.keys(_unpinSpecialNotice).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _unpinSpecialNotice[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _unpinSpecialNotice[key];
    }
  });
});
var _setNotificationCounts = require("./setNotificationCounts");
Object.keys(_setNotificationCounts).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _setNotificationCounts[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _setNotificationCounts[key];
    }
  });
});