import * as motTestHelpers from './helpers/helpers';

export const getMotTestResultComments = (req, res) => {
  return res.render('prototypes/mot-test/index', { viewData: req.session.viewData });
};

export const getTesterComments = (req, res) => {
  return res.render('prototypes/mot-test/add-tester-comment/index', { errors: req.session.errors });
};

// TODO 
// detect if session exists
export const postTesterComments = (req, res) => {
  // Init an empty viewData object
  let viewData = {
    val: req.body.comment ? motTestHelpers.formatTextAreaResponse(req.body.comment) : null,
    errors: [],
    comments: [],
  };

  // If textarea was not interacted with add an error message
  if (!viewData.val) {
    viewData.errors.push('Please do not leave this blank');
  } else {
    // push comment value to viewData's comment array
    viewData.comments.push({
      id: viewData.comments.length + 1,
      value: viewData.val
    });
  }

  // Init viewData session
  req.session.viewData = viewData;

  // View data contains no errors
  if (!req.session.viewData.errors.length) return res.redirect('/prototypes/mot-test/');
  
  // Return to add tester comment view if errors
  return res.redirect('/prototypes/mot-test/add-tester-comment');
};