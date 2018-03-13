'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getReview = exports.removeSessionAndRedirect = exports.postTesterComments = exports.getTesterComments = exports.getMotTestResultComments = undefined;

var _helpers = require('./helpers/helpers');

var motTestHelpers = _interopRequireWildcard(_helpers);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

const getMotTestResultComments = exports.getMotTestResultComments = (req, res) => res.render('prototypes/mot-test/index', { viewData: req.session.viewData });

const getTesterComments = exports.getTesterComments = (req, res) => {
  return res.render('prototypes/mot-test/add-tester-comment/index', { viewData: req.session.viewData ? req.session.viewData : null });
};

const postTesterComments = exports.postTesterComments = (req, res) => {
  // Init an empty viewData object
  let viewData = {
    comment: req.body.comment ? motTestHelpers.formatTextAreaResponse(req.body.comment.trim()) : null,
    errors: []
  };

  // Create error message if textarea value was not set or contains white spacce only
  if (!viewData.comment || !viewData.comment.trim()) {
    // Push error message
    viewData.errors.push('Enter comment - You must enter a comment');
  }

  // Init viewData session
  req.session.viewData = viewData;

  // View data contains no errors
  if (!req.session.viewData.errors.length) return res.redirect('/prototypes/mot-test/');

  // Return to add tester comment view if errors
  return res.redirect('/prototypes/mot-test/add-tester-comment');
};

// Currently implemented as a convinence method for removing a session.
const removeSessionAndRedirect = exports.removeSessionAndRedirect = (req, res) => {
  // Resets session & redirects
  req.session.viewData = null;
  return res.redirect('/prototypes/mot-test/');
};

const getReview = exports.getReview = (req, res) => res.render('prototypes/mot-test/review', { viewData: req.session.viewData });