'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.basicFireSafetyGet = basicFireSafetyGet;
exports.basicFireSafetyPost = basicFireSafetyPost;
exports.scormCompleteGet = scormCompleteGet;
// import generic validation functions
// import { validateEmail } from './validation-functions';

// GET
function basicFireSafetyGet(req, res) {
  let viewData, signinError, showMeTheScormScreenShot;

  showMeTheScormScreenShot = req.session.showMeTheScormScreenShot;

  viewData = {
    signinError,
    showMeTheScormScreenShot
  };

  return res.render('prototypes/learner/v7/scorms/basic-fire-safety/index', viewData);
}

// Start: POST
function basicFireSafetyPost(req, res) {
  const { email, password } = req.body;

  return res.redirect('/prototypes/learner/v7/');
}

// GET
function scormCompleteGet(req, res) {
  let viewData, trainingEndDate;

  trainingEndDate = req.session.trainingEndDate;

  viewData = {
    trainingEndDate
  };

  return res.render('prototypes/learner/v7/scorms/basic-fire-safety/complete', viewData);
}