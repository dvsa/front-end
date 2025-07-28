"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.robots = exports.index = void 0;
// Robots
const robots = (req, res) => {
  res.type('text/plain');
  res.send('User-agent: *\nDisallow: /');
};

// Index Route
exports.robots = robots;
const index = (req, res) => {
  let viewData = {
    pageTitle: 'MOT testing service Design System'
  };
  res.render('main/index', viewData);
};
exports.index = index;