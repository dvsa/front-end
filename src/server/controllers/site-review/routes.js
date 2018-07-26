import { initViewData } from './viewData';
import { getLastInUrl } from './helpers/getLastInUrl';

/**
 * GET request middleware - clears session and returns to site review landing view
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
export const clearReviewSession = (req, res) => {
  // Resets session data if exists
  if (req.session.viewData) {
    req.session.viewData = initViewData();
  };

  // Renders view
  return res.render('prototypes/site-review-new/index');
};

/**
 * GET request middleware - gets the assessment view
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
export const getAssessment = (req, res) => {
  let assessmentType = getLastInUrl(req);

  // If assessmentType type doesnt exist
  if (!assessmentType) {
    // Re-render previous view
    return res.render('/prototypes/site-review-new/choose-section/');
  }

  // Set session viewData
  req.session.viewData = req.session.viewData || initViewData();

  // Renders categories view
  return res.render(`prototypes/site-review-new/assessment/${assessmentType}/index`, { viewData: req.session.viewData });
};

/**
 * POST request middleware - posts an assessment
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
export const postAssessment = (req, res) => {
  let assessmentType = getLastInUrl(req);

  if (req.session.viewData[assessmentType].errors.length) {
    return res.redirect(`/prototypes/site-review-new/assessment/${assessmentType}`);
  }

  // Redirect to section on successful post
  return res.redirect('/prototypes/site-review-new/choose-section/');
};

/**
 * GET request middleware - gets the choose section view
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
export const getChooseSection = (req, res) => {
  // Render choose section index
  req.session.viewData = req.session.viewData || initViewData();
  return res.render('prototypes/site-review-new/choose-section/index', { viewData: req.session.viewData });
};
