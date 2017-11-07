import * as MOT_INDEX_DATA from './../data/index.json';

// Robots
export let robots = (req, res) => {
  res.type('text/plain');
  res.send('User-agent: *\nDisallow: /');
};

// Index Route
export let index = (req, res) => {
  let viewData = {
    ...MOT_INDEX_DATA,
    pageTitle: 'MOT testing service Design System',
    loggedOut: true,
    designSystem: true,
  };

  res.render('main/index', viewData);
};
