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
exports.actionsGet = actionsGet;
exports.actionsPost = actionsPost;
exports.feedbackGet = feedbackGet;

var _validationFunctions = require('./validation-functions');

function homeGet(req, res) {
  let viewData, hideHomeStars, action, courseId, removeCheckMessage, removeMessage;

  // anotherTestVar = global.anotherTestVar;
  // console.log('anotherTestVar = ' + anotherTestVar);

  // req.session.removeMessage = false;
  hideHomeStars = req.session.hideHomeStars;
  action = req.param('action');
  courseId = req.param('id');

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
    removeCheckMessage
  };

  return res.render('prototypes/learner/v1/home/index', viewData);
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

  return res.render('prototypes/learner/v1/learning-plan/index', viewData);
}

// profile GET
function profileGet(req, res) {
  let viewData;

  viewData = {};

  return res.render('prototypes/learner/v1/profile/index', viewData);
}

// learning record GET
function recordGet(req, res) {
  let viewData;

  viewData = {};

  return res.render('prototypes/learner/v1/learning-record/index', viewData);
}

// suggested learning GET
function suggestedGet(req, res) {
  let viewData, hideHomeStars;

  hideHomeStars = req.session.hideHomeStars;

  viewData = {
    hideHomeStars
  };

  return res.render('prototypes/learner/v1/suggested-learning/index', viewData);
}

// search
function searchGet(req, res) {
  let viewData, searchTerm;

  searchTerm = req.session.searchTerm;

  viewData = {
    searchTerm
  };

  return res.render('prototypes/learner/v1/search/index', viewData);
}

// Personal details: POST
function searchPost(req, res) {
  const { searchInput } = req.body;

  let searchTerm;
  searchTerm = searchInput;
  req.session.searchTerm = searchTerm;

  return res.redirect('/prototypes/learner/v1/search');
}

// Actions: POST
// just deals with various actions and then redirects accordingly with session stuff stored to
function actionsGet(req, res) {
  let action, type, searchTerm, redirectPath, referrer, status;

  action = req.param('action');
  // type = req.param('type');
  status = req.param('status');
  referrer = req.headers.referer;
  redirectPath = referrer;

  console.log('referrer = ' + referrer);

  console.log('action = ' + action);

  if (action == 'addedToLearningPlan') {
    req.session.addedToLearningPlan = true;
    redirectPath = '/prototypes/learner/v1/learning-plan';
  }

  if (action == 'removedFromLearningPlan' && status == 'started') {
    // req.session.removedFromLearningPlan = true;
    req.session.removedFromLearningPlanWarning = true;
    redirectPath = '/prototypes/learner/v1/learning-plan';
  }

  if (action == 'removedFromLearningPlan' && status != 'started') {
    req.session.removedFromLearningPlan = true;
    // req.session.removedFromLearningPlanWarning = true;
    redirectPath = '/prototypes/learner/v1/learning-plan';
  }

  // removedFromSuggestedList
  if (action == 'removedFromSuggestedList') {
    req.session.removedFromSuggestedList = true;
    redirectPath = '/prototypes/learner/v1/learning-plan';
  }

  return res.redirect(redirectPath);
}

function actionsPost(req, res) {
  const { action, type } = req.body;

  //let searchTerm, redirectPath;

  /*if (action === 'addedToLearningPlan') {
        req.session.addedToLearningPlan = true;
        // req.session.hasBeenAddedType = true;
        redirectPath = '/prototypes/learner/v1/suggested-learning';
    }*/

  return res.redirect(redirectPath);
}

// search
function feedbackGet(req, res) {
  let viewData;

  viewData = {};

  return res.render('prototypes/learner/v1/feedback/index', viewData);
}