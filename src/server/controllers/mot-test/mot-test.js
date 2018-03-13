import * as motTestHelpers from './helpers/helpers';

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

export const getMOTResults = (req, res) => {
  if (req.session.viewData) req.session.viewData.errors = null;
  return res.render('prototypes/mot-test/index', { viewData: req.session.viewData, flashMessage: req.flash('flash-message') });
};

export const getAddTesterComment = (req, res) => {

  return res.render('prototypes/mot-test/comment/index', { viewData: req.session.viewData ? req.session.viewData : null });
};

export const postAddTesterComment = (req, res) => {
  postMessage(req, res, {
    errorMessage: 'Enter comment - You must enter a comment',
    flashMsg: 'Testers comment successfully added',
    redirectUrl: '/prototypes/mot-test/comment',
  });
};

export const getEditTesterComment = (req, res) => {
  return res.render('prototypes/mot-test/comment/edit', { viewData: req.session.viewData });
};

export const postEditTesterComment = (req, res) => {
  postMessage(req, res, {
    errorMessage: 'Edit comment - You must enter a comment',
    flashMsg: 'Testers comment successfully edited',
    redirectUrl: '/prototypes/mot-test/comment/edit',
  });
};

export const destorySession = (req, res) => {
  // Resets session & redirects
  req.session.viewData = null;
  req.flash('flash-message', 'Testers comment has been successfully removed');
  return res.redirect('/prototypes/mot-test/');
};

export const getReview = (req, res) => res.render('prototypes/mot-test/review', { viewData: req.session.viewData });
