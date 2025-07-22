"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isTesting = exports.isDevelopment = exports.SRC_PATH = exports.CONFIG = void 0;
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var SRC_PATH = exports.SRC_PATH = _path["default"].resolve('src', 'server');
var isDevelopment = exports.isDevelopment = function isDevelopment() {
  return process.env.NODE_ENV == 'development';
};
var isTesting = exports.isTesting = function isTesting() {
  return process.env.NODE_ENV == 'testing';
};
var config = {
  port: process.env.PORT || 3002,
  sessionSecret: process.env.SESSION_SECRET || 'secret',
  appURL: 'https://dvsa-front-end.herokuapp.com',
  paths: {
    src: SRC_PATH,
    views: {
      base: _path["default"].join(SRC_PATH, 'views')
    },
    assets: _path["default"].join(SRC_PATH, 'assets'),
    data: _path["default"].join(SRC_PATH, 'data'),
    publicAssets: isDevelopment() ? _path["default"].resolve('public') : _path["default"].resolve('dist', 'assets')
  }
};
if (isDevelopment()) {
  config = _objectSpread(_objectSpread({}, config), {}, {
    appURL: "http://localhost:".concat(config.port)
  });
}
var CONFIG = exports.CONFIG = config;