// config GET
export function configGet(req, res) {
  let viewData, configError, clearSession;

  configError = req.session.configError;

  clearSession = req.param('clearSession');
  console.log('clearSession = ' + clearSession);
  console.log('testing config controller');
  if (clearSession === 'true') {
    req.session.destroy();
    // res.redirect('/prototypes/learner/v10/config');
  }

  viewData = {
    configError,
  };

  return res.render('prototypes/learner/v10/config', viewData);
}

export function configPost(req, res) {
  const { regConfig, clearSession, scormConfig, rolesConfig, newNavConfig } = req.body;

  console.log('regConfig');
  let showAllStars, hideDetailStars, hideHomeStars, showMeTheScormScreenShot, showRolesJoined, showNewNav;

  showAllStars = false;
  hideDetailStars = true;
  hideHomeStars = true;
  showMeTheScormScreenShot = false;

  showNewNav = newNavConfig;
  if (showNewNav == 'newNavYes') {
    req.session.showNewNav = true;
  } else {
    req.session.showNewNav = null;
  }

  console.log('req.session.showNewNav = ' + showNewNav);

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

  console.log('rolesConfig = ' + rolesConfig);

  if (rolesConfig == 'joinedRoles') {
    showRolesJoined = true;
    req.session.showRolesJoined = showRolesJoined;
  }

  res.local = {
    testingLocals: 'testing 123',
  };

  res.locals.testingVars = 'my value';

  console.log(req.session);

  if (!regConfig) {
    req.session.configError = true;
    return res.redirect('/prototypes/learner/v10/config');
  } else {
    req.session.configError = false;
    return res.redirect('/prototypes/learner/v10');
  }
}
