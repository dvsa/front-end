'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getReview = exports.destorySession = exports.postEditTesterComment = exports.getEditTesterComment = exports.postAddTesterComment = exports.getAddTesterComment = exports.getMOTResults = undefined;

var _helpers = require('./helpers/helpers');

var motTestHelpers = _interopRequireWildcard(_helpers);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// Config param populates error / flash message & redirect URL
const postMessage = (req, res, config) => {
  let viewData = {
    comment: req.body.comment ? motTestHelpers.formatTextAreaResponse(req.body.comment.trim()) : null,
    errors: []
  };

  // Create error message if textarea value was not set or contains white spacce only
  if (!viewData.comment || !viewData.comment.trim()) {
    // Push error message
    viewData.errors.push(config.errorMessage);
  }

  // Init viewData session
  req.session.viewData = viewData;

  // View data contains no errors
  if (!req.session.viewData.errors.length) {
    // Adds a flash message to session & redirect
    req.flash('flash-message', config.flashMsg);
    return res.redirect('/prototypes/mot-test/');
  }

  // Return to add tester comment view if errors
  return res.redirect(config.redirectUrl);
};

const getMOTResults = exports.getMOTResults = (req, res) => {
  // Resets error session
  if (req.session.viewData) req.session.viewData.errors = null;
  return res.render('prototypes/mot-test/index', { viewData: req.session.viewData, flashMessage: req.flash('flash-message') });
};

const getAddTesterComment = exports.getAddTesterComment = (req, res) => {
  return res.render('prototypes/mot-test/comment/index', { viewData: req.session.viewData ? req.session.viewData : null });
};

const postAddTesterComment = exports.postAddTesterComment = (req, res) => {
  postMessage(req, res, {
    errorMessage: 'Enter comment - You must enter a comment',
    flashMsg: 'Testers comment successfully added',
    redirectUrl: '/prototypes/mot-test/comment'
  });
};

const getEditTesterComment = exports.getEditTesterComment = (req, res) => {
  return res.render('prototypes/mot-test/comment/edit', { viewData: req.session.viewData });
};

const postEditTesterComment = exports.postEditTesterComment = (req, res) => {
  postMessage(req, res, {
    errorMessage: 'Edit comment - You must enter a comment',
    flashMsg: 'Testers comment successfully edited',
    redirectUrl: '/prototypes/mot-test/comment/edit'
  });
};

const destorySession = exports.destorySession = (req, res) => {
  // Resets session & redirects
  req.session.viewData = null;
  req.flash('flash-message', 'Testers comment successfully removed');
  return res.redirect('/prototypes/mot-test/');
};

const getReview = exports.getReview = (req, res) => res.render('prototypes/mot-test/review', { viewData: req.session.viewData });