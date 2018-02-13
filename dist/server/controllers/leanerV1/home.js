'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.homeGet = homeGet;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _constants = require('./../../config/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// home GET
function homeGet(req, res) {
  let viewData;

  viewData = {};

  return res.render('prototypes/learner/v1/home/index', viewData);
}