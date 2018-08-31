import { initViewData } from './initChangeData.js';
import { isEmpty } from './helpers/helpers';
import { getLastInUrl } from '../site-review/helpers/getLastInUrl.js';

export * from './validators/validation.js';

/**
 * GET Middleware - Initialise session for Stage 1
 *
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
export const resetSession = (req, res) => {
  // Reset session to dummy data from home page if not present
  req.session.viewData = initViewData();
  return res.render('./prototypes/vts-changes/start', { viewData: req.session.viewData });
};

/**
 * POST Middleware - Declare types of equipment being changed
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
export const postType = (req, res) => {
  // Get submitted values and clean up nulls...
  const formData = req.body;
  delete formData['null'];
  // ...add to session
  req.session.viewData.questions.type.answer = formData;

  // Push each answer into array of types for display in Summary
  const answers = formData;
  const types = [];
  for (var answer in answers) {
    if (answers.hasOwnProperty(answer)) {
      // Convert first leter to uppercase
      let capAnswer = answer.replace(/^\w/, cap => cap.toUpperCase());
      types.push(capAnswer);
    }
  }
  // Add array of types to session
  req.session.viewData.typeNames = types;

  // If there were errors in the session from validator, return to question
  const errors = req.session.viewData.questions.type.errors[0];
  if (errors) {
    return res.redirect(`/prototypes/vts-changes/type`);
  }

  // Proceed to next question
  return res.redirect(`/prototypes/vts-changes/approved`);
};

/**
 * POST Middleware - Declare whether equipment is DVSA approved.
 * Conditionally render next stage or notice depending on 'yes' or 'no'
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
export const postApproved = (req, res) => {
  // Get submitted values
  const formData = req.body;
  const errors = req.session.viewData.questions.approved.errors[0]
  
  // Add answers to session
  req.session.viewData.questions.approved.answer = formData;
  
  // If there were errors in the session, return to question
  if (errors) {
    return res.redirect(`/prototypes/vts-changes/approved`);
  }
  
  // If 'no', render notice
  const answer = formData['dvsa-approved'];
  if (answer === 'no') {
    return res.redirect('/prototypes/vts-changes/unapproved-notice');
  }
  // If 'yes', direct to next question
  return res.redirect('/prototypes/vts-changes/layout');
};

/**
 * POST Middleware - Declare whether premises layout change is needed.
 * Conditionally render next question or a notice.
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
export const postLayout = (req, res) => {
  // Get submitted values
  const formData = req.body;
  // Add answers to session.
  req.session.viewData.questions.layout.answer = formData;
  
  // If there were errors in the session, return to question
  const errors = req.session.viewData.questions.layout.errors[0];
  if (errors) { 
    return res.redirect(`/prototypes/vts-changes/layout`);
  }
  
  // If 'yes', render notice
  const answer = formData['layout-change'];
  if (answer === 'yes') {
    return res.redirect('/prototypes/vts-changes/change-notice');
  }
  return res.redirect('/prototypes/vts-changes/classes');

};

/**
 * POST Middleware - Declare whether Equipment can test the same class
 * Conditionally render next question or a notice.
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
export const postClasses = (req, res) => {
  // Get submitted values for answer
  const formData = req.body;
  const answer = formData['same-class'];
  const errors = req.session.viewData.questions.classes.errors[0];

  // If there were errors in the session, return to question
   if (errors) {
    return res.redirect(`/prototypes/vts-changes/classes`);
  } 
  // Add answers to session
  req.session.viewData.questions.classes.answer = formData;
  // If 'no', render notice
  if (answer === 'no') {
    return res.redirect('/prototypes/vts-changes/change-notice');
  }
  return res.redirect('/prototypes/vts-changes/summary');
};

 
/**
 * GET Middleware - Render 'Equipment types' question
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
export const getType = (req, res) => {
  req.session.viewData = req.session.viewData || initViewData();
  return res.render('./prototypes/vts-changes/type/index', { viewData: req.session.viewData });
};

/**
 * GET Middleware - Render 'Approval' question
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
export const getApproved = (req, res) => {
  req.session.viewData = req.session.viewData || initViewData();
  return res.render('./prototypes/vts-changes/approved/index', { viewData: req.session.viewData });
};

/**
 * GET Middleware - Render 'Layout' question
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
export const getLayout = (req, res) => {
  req.session.viewData = req.session.viewData || initViewData();
  return res.render('./prototypes/vts-changes/layout/index', { viewData: req.session.viewData });
};

/**
 * GET Middleware - Render 'Classes' question
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
export const getClasses = (req, res) => {
  req.session.viewData = req.session.viewData || initViewData();
  return res.render('./prototypes/vts-changes/classes/index', { viewData: req.session.viewData });
};

/**
 * GET Middleware - Render summary with answers.
 *  Normalises casing on Types.
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
export const getSummary = (req, res) => {
  return res.render('./prototypes/vts-changes/summary/index', { viewData: req.session.viewData });
}; 

/**
 * GET Middleware - Render confirmation
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
export const getConfirmation = (req, res) => {
  return res.render('./prototypes/vts-changes/confirmation/index');
};
