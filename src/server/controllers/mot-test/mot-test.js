import * as motTestHelpers from './helpers/helpers';

export const getMotTestResultComments = (req, res) => res.render('prototypes/mot-test/index', { viewData: req.session.viewData });

export const getTesterComments = (req, res) => {
  return res.render('prototypes/mot-test/add-tester-comment/index', { viewData: req.session.viewData ? req.session.viewData : null });
};

export const postTesterComments = (req, res) => {
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
export const removeSessionAndRedirect = (req, res) => {
  // Resets session & redirects
  req.session.viewData = null;
  return res.redirect('/prototypes/mot-test/');
};

export const getReview = (req, res) => res.render('prototypes/mot-test/review', { viewData: req.session.viewData });
