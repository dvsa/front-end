import { initViewData } from './initChangeData.js';
import { isEmpty } from './helpers/helpers';

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
 
  // Get submitted values
  const formData = req.body;
  // Remove any that are null (eg submit button)
  delete formData['null']; 
  const answer = formData;
  const data = req.session.viewData.questions.type;

  // Add answers to session
  req.session.viewData.questions.type.answer = answer;

  // If there were errors in the session
  if (data.errors[0]) {
    const typeError = data.errors[0]['typeError'];
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
  const answer = formData['dvsa-approved'];
  const data = req.session.viewData.questions.approved;

  // Add answers to session
  req.session.viewData.questions.approved.answer = answer;

  // If there were errors in the session, return to question
  if (data.errors[0]) {
    const typeError = data.errors[0]['approvedError'];
    return res.redirect(`/prototypes/vts-changes/approved`);
  }
    
  // If 'no', render notice
  if (answer === 'no') {
    return res.redirect('/prototypes/vts-changes/change-notice');
  } 
  // If 'yes', direct to next question
  return res.redirect('/prototypes/vts-changes/layout');
};

/**
 * POST Middleware - Declare whether premises layout change is needed.
 * Conditionally render next stage depending on 'yes' or 'no'
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
export const postLayout = (req, res) => {
  
  // Get submitted values
  const formData = req.body;
  const answer =  formData['layout-change'];
  // Add answers to session.
  req.session.viewData.questions.layout.answer = answer;
  

  const data = req.session.viewData.questions.layout;
  // If there were errors in the session, return to question
  if (data.errors[0]) {
    const typeError = data.errors[0]['layoutError'];
    return res.redirect(`/prototypes/vts-changes/layout`);
  }

  // If 'yes', render notice
  if (answer === 'yes') {
    return res.redirect('/prototypes/vts-changes/change-notice');
  } 
  return res.redirect('/prototypes/vts-changes/classes');
};

/**
 * POST Middleware - Declare same vehicle class capability of equipment change.
 * Conditionally render next stage depending on 'yes' or 'no'
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
export const postClasses = (req, res) => {
  // Get submitted values
  const formData = req.body;
  const answer = {
    value: formData['same-class'],
  };
  // Add answers to session. Redirect to next question
  req.session.viewData.questions.classes = answer;

  // If 'no', render notice
  if (answer.value === 'no') {
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
 * GET Middleware - Render summary with collected viewdata. Normalise casing on Types.
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
export const getSummary = (req, res) => {
  // If types not set...
  if (!req.session.viewData.questions.type.length) {
    // Populate types from session data
    const answers = req.session.viewData.questions.type;
    const types = [];
    for (var answer in answers) {
      if (answers.hasOwnProperty(answer)) {
        // Convert first leter to uppercase
        let capAnswer = answer.replace(/^\w/, cap => cap.toUpperCase());
        types.push(capAnswer);
      }
    }
    // Add types to viewdata
    req.session.viewData.questions.type = types;
  }
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
