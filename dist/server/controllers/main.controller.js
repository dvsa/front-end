"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.robots = exports.index = void 0;
// Robots
var robots = exports.robots = function robots(req, res) {
  res.type('text/plain');
  res.send('User-agent: *\nDisallow: /');
};

// Index Route
var index = exports.index = function index(req, res) {
  var viewData = {
    pageTitle: 'MOT testing service Design System'
  };
  res.render('main/index', viewData);
};