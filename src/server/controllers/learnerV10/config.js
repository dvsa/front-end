// config GET
import nunjucks from 'nunjucks';

export function configGet(req, res) {
  let viewData, configError, clearSession;

  configError = req.session.configError;

  clearSession = req.param('clearSession');
  //console.log('clearSession = ' + clearSession);
  //console.log('testing config controller');
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

  // console.log('regConfig');
  let showAllStars, hideDetailStars, hideHomeStars, showMeTheScormScreenShot, showRolesJoined, showNewNav;

  showAllStars = false;
  hideDetailStars = true;
  hideHomeStars = true;
  showMeTheScormScreenShot = false;

  showNewNav = newNavConfig;
  console.log('newNavConfig = ' + newNavConfig);
  if (newNavConfig === 'newNavYes') {
    console.log('showNewNav should be true = ' + showNewNav);
    req.session.showNewNav = true;
    /*res.locals({
      testString: 'bollocks',
    });*/
    global.testVar = 'test value';
    // req.locals.testing123 = 'wonderful';
  } else {
    console.log('showNewNav should be false = ' + showNewNav);
    req.session.showNewNav = null;
  }

  console.log('req.session.showNewNav = ' + showNewNav);

  // all | detailAndhome |  home
  if (regConfig === 'all') {
    showAllStars = true;
  } else if (regConfig === 'detailAndHome') {
    hideDetailStars = true;
    hideHomeStars = true;
  } else if (regConfig === 'home') {
    hideHomeStars = true;
  }

  req.session.showAllStars = showAllStars;
  req.session.hideDetailStars = hideDetailStars;
  req.session.hideHomeStars = hideHomeStars;

  if (scormConfig == 'hellNo') {
    showMeTheScormScreenShot = true;
  }
  req.session.showMeTheScormScreenShot = showMeTheScormScreenShot;

  //console.log('rolesConfig = ' + rolesConfig);

  if (rolesConfig == 'joinedRoles') {
    showRolesJoined = true;
    req.session.showRolesJoined = showRolesJoined;
  }

  /*res.local = {
    testingLocals: 'testing 123',
  };

  res.locals.testingVars = 'my value';*/

  let env2 = new nunjucks.Environment();

  let testingVar;
  env2.addGlobal(testingVar, 'testing');

  console.log('testingVar = ' + env2.testingVar);

  /*let njglobals = require('nunjucks/src/globals');
  njglobals.someVar = 'someValue';
  console.log('njglobals below: ***************************');
  console.log(njglobals);*/

  if (!regConfig) {
    req.session.configError = true;
    return res.redirect('/prototypes/learner/v10/config');
  } else {
    req.session.configError = false;
    return res.redirect('/prototypes/learner/v10');
  }
}
