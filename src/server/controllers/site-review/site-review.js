import { addToSession } from '../speech-to-text-search/helpers/add-to-session.js';
import { initViewData } from './initViewData.js';
import { getLastInUrl } from './helpers/getLastInUrl.js';
import { getMonth } from './helpers/getMonth.js';

//export * from './routes.js';
export * from './validators/validation.js';
export * from './helpers/index.js';

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
  }
  // Renders view
  return res.render('prototypes/site-review/index');
};

/**
 *
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
    return res.render('/prototypes/site-review/choose-section/');
  }

  // Set session viewData
  req.session.viewData = req.session.viewData || initViewData();

  // Renders categories view
  return res.render(`prototypes/site-review/assessment/${assessmentType}/index`, { viewData: req.session.viewData });
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
    return res.redirect(`/prototypes/site-review/assessment/${assessmentType}`);
  }

  // Redirect to section on successful post
  return res.redirect('/prototypes/site-review/choose-section/');
};

/**
 *
 * GET request middleware - gets the choose section view
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
export const getChooseSection = (req, res) => {
  // Render choose section index
  req.session.viewData = req.session.viewData || initViewData();
  return res.render('prototypes/site-review/choose-section/index', { viewData: req.session.viewData });
};

/**
 *
 * GET request middleware - gets the choose section view
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
export const getDetails = (req, res) => {
  // Render choose section index
  req.session.viewData = req.session.viewData || initViewData();
  return res.render('prototypes/site-review/enter-details/index', { viewData: req.session.viewData });
};

/**
 * Get request middleware - Posts details form summary view
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */

export const postDetails = (req, res) => {
  // If there are errors, reload details page
  if (req.session.viewData.testerDetails.errors.length) {
    return res.redirect(`/prototypes/site-review/enter-details`);
  }

  // Add friendly date to viewData
  //req.session.viewData = req.session.viewData || {};
  const testerDetails = req.body || {};
  // Create a friendly date from the three numbers input
  let testDate = `${testerDetails.testDay} ${getMonth(testerDetails.testMonth - 1)} ${testerDetails.testYear}`;

  // Check we have a valid date string
  if (testDate.indexOf('undefined') == 1) {
    testDate = '02 August 2018';
  }

  // Append form data to viewdata in session
  req.session.viewData.testerDetails.date = testDate;

  // No errors - Successful post
  return res.redirect('/prototypes/site-review/summary');
};

/**
 * Get request middleware - Handle redirect to summary view
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */

export const getSummary = (req, res) => {
  return res.render('./prototypes/site-review/summary/index', {
    viewData: req.session.viewData,
  });
};
