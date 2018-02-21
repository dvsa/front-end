// config GET
export function configGet(req, res) {
  let viewData, configError;

  configError = req.session.configError;

  viewData = {
    configError,
  };

  return res.render('prototypes/learner/index', viewData);
}

export function configPost(req, res) {
  const { regConfig } = req.body;

  console.log('regConfig');
  let showAllStars, hideDetailStars, hideHomeStars;

  showAllStars = false;
  hideDetailStars = false;
  hideHomeStars = false;

  // all | detailAndhome |  home
  if (regConfig == 'all') {
    showAllStars = true;
  } else if (regConfig == 'detailAndHome') {
    hideDetailStars = true;
    hideHomeStars = true;
  } else if (regConfig == 'home') {
    hideHomeStars = true;
  }

  req.session.showAllStars = showAllStars;
  req.session.hideDetailStars = hideDetailStars;
  req.session.hideHomeStars = hideHomeStars;

  res.local = {
    testingLocals: 'testing 123',
  };

  res.locals.testingVars = 'my value';

  global.anotherTestVar = 'ONE MILLIONS!';

  console.log(req.session);

  if (!regConfig) {
    req.session.configError = true;
    return res.redirect('/prototypes/learner');
  } else {
    req.session.configError = false;
    return res.redirect('/prototypes/learner/v1');
  }
}
