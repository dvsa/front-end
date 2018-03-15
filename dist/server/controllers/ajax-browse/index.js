'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _postAjaxBrowse = require('./post-ajax-browse');

Object.keys(_postAjaxBrowse).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _postAjaxBrowse[key];
    }
  });
});

var _getAjaxBrowse = require('./get-ajax-browse');

Object.keys(_getAjaxBrowse).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _getAjaxBrowse[key];
    }
  });
});