'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Robots
const robots = exports.robots = (req, res) => {
  res.type('text/plain');
  res.send('User-agent: *\nDisallow: /');
};

// Index Route
const index = exports.index = (req, res) => {
  let viewData = {
    contentHeader: {
      type: 'Learning Platform For Government',
      title: 'Design System'
    },
    pageTitle: 'LPG Design System',
    loggedOut: true,
    designSystem: true
  };

  res.render('main/index', viewData);
};