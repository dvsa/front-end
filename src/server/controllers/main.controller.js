// Robots
export const robots = (req, res) => {
  res.type('text/plain');
  res.send('User-agent: *\nDisallow: /');
};

// Index Route
export const index = (req, res) => {
  let viewData = {
    contentHeader: {
      type: 'Learning Platform For Government',
      title: 'Design System',
    },
    pageTitle: 'LPG Design System',
    loggedOut: true,
    designSystem: true,
  };

  res.render('main/index', viewData);
};
