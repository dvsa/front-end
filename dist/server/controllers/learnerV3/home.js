'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.homeGet = homeGet;
exports.plannedGet = plannedGet;
exports.profileGet = profileGet;
exports.recordGet = recordGet;
exports.suggestedGet = suggestedGet;
exports.searchGet = searchGet;
exports.searchPost = searchPost;
exports.feedbackGet = feedbackGet;

var _validationFunctions = require('./validation-functions');

function homeGet(req, res) {
  let viewData, hideHomeStars, action, courseId, removeCheckMessage, removeMessage, fireTrainingComplete;

  // anotherTestVar = global.anotherTestVar;
  // console.log('anotherTestVar = ' + anotherTestVar);

  // req.session.removeMessage = false;
  hideHomeStars = req.session.hideHomeStars;
  action = req.param('action');
  courseId = req.param('id');
  fireTrainingComplete = req.session.fireTrainingComplete;

  if (parseInt(courseId) >= 1 && action === 'checkRemove') {
    removeCheckMessage = true;
  }

  if (parseInt(courseId) >= 1 && action === 'remove') {
    // removeCheckMessage = false;
    removeMessage = true;
  }

  // console.log('removeMessage = ' + removeMessage + ' and id = ' + courseId);

  viewData = {
    hideHomeStars,
    removeMessage,
    removeCheckMessage,
    fireTrainingComplete
  };

  return res.render('prototypes/learner/v3/home/index', viewData);
}

// planned GET
// home GET
function plannedGet(req, res) {
  let viewData, addedToLearningPlan, removedFromLearningPlan, removedFromLearningPlanWarning, hasBeenAdded, hasBeenRemoved, willBeRemoved;

  // action = req.param('action');
  // type = req.param('type');

  removedFromLearningPlanWarning = req.session.removedFromLearningPlanWarning;
  addedToLearningPlan = req.session.addedToLearningPlan;
  removedFromLearningPlan = req.session.removedFromLearningPlan;

  if (addedToLearningPlan) {
    hasBeenAdded = true;
    req.session.addedToLearningPlan = null;
  }

  if (removedFromLearningPlanWarning) {
    willBeRemoved = true;
    req.session.removedFromLearningPlanWarning = null;
  }

  if (removedFromLearningPlan) {
    hasBeenRemoved = true;
    req.session.removedFromLearningPlan = null;
  }

  // console.log('addedToLearningPlan = ' + addedToLearningPlan);

  viewData = {
    hasBeenAdded,
    willBeRemoved,
    hasBeenRemoved
  };

  return res.render('prototypes/learner/v3/learning-plan/index', viewData);
}

// profile GET
function profileGet(req, res) {
  let viewData;

  viewData = {};

  return res.render('prototypes/learner/v3/profile/index', viewData);
}

// learning record GET
function recordGet(req, res) {
  let viewData, fireTrainingComplete, fireTrainingCompleteBanner, trainingEndDate, todayDate, months;

  fireTrainingCompleteBanner = req.session.fireTrainingCompleteBanner;
  fireTrainingComplete = req.session.fireTrainingComplete;

  todayDate = new Date();
  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  trainingEndDate = todayDate.getDate() + ' ' + months[todayDate.getMonth()] + ' ' + todayDate.getFullYear();

  viewData = {
    fireTrainingCompleteBanner,
    fireTrainingComplete,
    trainingEndDate
  };

  req.session.fireTrainingCompleteBanner = null;

  return res.render('prototypes/learner/v3/learning-record/index', viewData);
}

// suggested learning GET
function suggestedGet(req, res) {
  let viewData, hideHomeStars;

  hideHomeStars = req.session.hideHomeStars;

  viewData = {
    hideHomeStars
  };

  return res.render('prototypes/learner/v3/suggested-learning/index', viewData);
}

// search
function searchGet(req, res) {
  let viewData, searchTerm;

  searchTerm = req.session.searchTerm;

  viewData = {
    searchTerm
  };

  return res.render('prototypes/learner/v3/search/index', viewData);
}

// Personal details: POST
function searchPost(req, res) {
  const { searchInput } = req.body;

  let searchTerm;
  searchTerm = searchInput;
  req.session.searchTerm = searchTerm;

  return res.redirect('/prototypes/learner/v3/search');
}

// search
function feedbackGet(req, res) {
  let viewData;

  viewData = {};

  return res.render('prototypes/learner/v3/feedback/index', viewData);
}