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
      type: 'MOT testing service',
      title: 'Design System'
    },
    pageTitle: 'MOT testing service Design System',
    loggedOut: true,
    designSystem: true
  };

  res.render('main/index', viewData);
};