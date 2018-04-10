// config GET
export function configGet(req, res) {
  let viewData, configError, clearSession;

  configError = req.session.configError;

  clearSession = req.param('clearSession');
  console.log('clearSession = ' + clearSession);
  if (clearSession === 'true') {
    req.session.destroy();
    // res.redirect('/prototypes/learner/v5/config');
  }

  viewData = {
    configError,
  };

  return res.render('prototypes/learner/v5/config', viewData);
}

export function configPost(req, res) {
  const { regConfig, clearSession, scormConfig } = req.body;

  console.log('regConfig');
  let showAllStars, hideDetailStars, hideHomeStars, showMeTheScormScreenShot;

  showAllStars = false;
  hideDetailStars = true;
  hideHomeStars = true;
  showMeTheScormScreenShot = false;

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

  if (scormConfig == 'hellNo') {
    showMeTheScormScreenShot = true;
  }
  req.session.showMeTheScormScreenShot = showMeTheScormScreenShot;

  res.local = {
    testingLocals: 'testing 123',
  };

  res.locals.testingVars = 'my value';

  global.anotherTestVar = 'ONE MILLIONS!';

  console.log(req.session);

  if (!regConfig) {
    req.session.configError = true;
    return res.redirect('/prototypes/learner/v5/config');
  } else {
    req.session.configError = false;
    return res.redirect('/prototypes/learner/v5');
  }
}
