import * as MOT_INDEX_DATA from './../data/index.json';

// Robots
export const robots = (req, res) => {
  res.type('text/plain');
  res.send('User-agent: *\nDisallow: /');
};

// Index Route
export const index = (req, res) => {
  let viewData = {
    ...MOT_INDEX_DATA,
    pageTitle: 'MOT testing service Design System',
    loggedOut: true,
    designSystem: true,
  };

  res.render('main/index', viewData);
};
