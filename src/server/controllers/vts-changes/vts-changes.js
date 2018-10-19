import { initViewData } from './initChangeData.js';
import { isEmpty } from './helpers/helpers';
import { getLastInUrl } from '../site-review/helpers/getLastInUrl.js';

export * from './validators/validation.js';

/**
 * GET Middleware - Initialise session for Stage 1
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
  const labelArr = Object.entries(formData).map(([key, value]) => key);

  const types = [];
  let answer = '';

  labelArr.forEach(label => {
    if (label == 'headlamp') {
      answer = 'Headlamp beam tester';
    } else if (label == 'plate') {
      answer = 'Plate brake tester';
    } else if (label == 'roller') {
      answer = 'Roller brake tester';
    } else if (label == 'wheel') {
      answer = 'Wheel play detector';
    } else if (label == 'ramp') {
      answer = 'Ramp, hoist or lift';
    }
    types.push(answer);
  });

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
 * POST Middleware - Handle each Y/N answer.
 * Conditionally render next question or a notice.
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
export const postStage = (req, res) => {
  // Name of the stage being posted
  const stageName = getLastInUrl(req);
  // Get submitted values for answer
  const formData = req.body;
  const answer = formData[stageName];
  const errors = req.session.viewData.questions[`${stageName}`].errors[0];

  // If there were errors in the session, return to question
  if (errors) {
    return res.redirect(`/prototypes/vts-changes/${stageName}`);
  }

  // Add submktted answers to session
  req.session.viewData.questions[`${stageName}`].answer = formData;

  // Check stage for the 'correct' answer, and redirect to next stage or show a Notice
  switch (stageName) {
    case 'approved':
      // If 'no', render notice
      if (answer === 'no') {
        return res.redirect('/prototypes/vts-changes/unapproved-notice');
      }
      // If 'yes', direct to next question
      return res.redirect('/prototypes/vts-changes/layout');
      break;

    case 'layout':
      // If 'yes', render notice
      if (answer === 'yes') {
        return res.redirect('/prototypes/vts-changes/change-notice');
      }
      // If 'no', direct to next question
      return res.redirect('/prototypes/vts-changes/classes');
      break;

    case 'classes':
      // If 'yes', render notice
      if (answer === 'no') {
        return res.redirect('/prototypes/vts-changes/change-notice');
      }
      // if yes, go to summary
      return res.redirect('/prototypes/vts-changes/summary');
      break;

    default:
      break;
  }
};

/**
 * GET Middleware - Render Y/N questions
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
export const getStage = (req, res) => {
  req.session.viewData = req.session.viewData || initViewData();
  const stageName = getLastInUrl(req);
  return res.render(`./prototypes/vts-changes/${stageName}/index`, { viewData: req.session.viewData });
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
