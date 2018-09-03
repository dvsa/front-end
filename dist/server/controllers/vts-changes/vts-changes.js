'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getConfirmation = exports.getSummary = exports.getClasses = exports.getLayout = exports.getApproved = exports.getType = exports.postClasses = exports.postLayout = exports.postApproved = exports.postType = exports.resetSession = undefined;

var _validation = require('./validators/validation.js');

Object.keys(_validation).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _validation[key];
    }
  });
});

var _initChangeData = require('./initChangeData.js');

var _helpers = require('./helpers/helpers');

/**
 * GET Middleware - Initialise session for Stage 1
 *
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
const resetSession = exports.resetSession = (req, res) => {
  // Reset session to dummy data from home page if not present
  req.session.viewData = (0, _initChangeData.initViewData)();
  return res.render('./prototypes/vts-changes/start', { viewData: req.session.viewData });
};

/**
 * POST Middleware - Declare types of equipment being changed
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
const postType = exports.postType = (req, res) => {
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
const postApproved = exports.postApproved = (req, res) => {
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
const postLayout = exports.postLayout = (req, res) => {
  // Get submitted values
  const formData = req.body;
  const answer = formData['layout-change'];
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
 * POST Middleware - Declare whether Equipment can test the same class
 * Conditionally render next question or a notice.
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
const postClasses = exports.postClasses = (req, res) => {
  // Get submitted values for answer
  const answer = req.body['same-class'];

  // If there were errors in the session, return to question
  const errors = req.session.viewData.questions.classes.errors;
  if (errors[0]) {
    const typeError = errors[0]['classesError'];
    return res.redirect(`/prototypes/vts-changes/classes`);
  }

  // Add answers to session
  req.session.viewData.questions.classes.answer = answer;
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
const getType = exports.getType = (req, res) => {
  req.session.viewData = req.session.viewData || (0, _initChangeData.initViewData)();
  return res.render('./prototypes/vts-changes/type/index', { viewData: req.session.viewData });
};

/**
 * GET Middleware - Render 'Approval' question
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
const getApproved = exports.getApproved = (req, res) => {
  req.session.viewData = req.session.viewData || (0, _initChangeData.initViewData)();
  return res.render('./prototypes/vts-changes/approved/index', { viewData: req.session.viewData });
};

/**
 * GET Middleware - Render 'Layout' question
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
const getLayout = exports.getLayout = (req, res) => {
  req.session.viewData = req.session.viewData || (0, _initChangeData.initViewData)();
  return res.render('./prototypes/vts-changes/layout/index', { viewData: req.session.viewData });
};

/**
 * GET Middleware - Render 'Classes' question
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
const getClasses = exports.getClasses = (req, res) => {
  req.session.viewData = req.session.viewData || (0, _initChangeData.initViewData)();
  return res.render('./prototypes/vts-changes/classes/index', { viewData: req.session.viewData });
};

/**
 * GET Middleware - Render summary with answers.
 *  Normalises casing on Types.
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
const getSummary = exports.getSummary = (req, res) => {
  // Populate types from session data
  const answers = req.session.viewData.questions.type.answer;
  const types = [];
  for (var answer in answers) {
    if (answers.hasOwnProperty(answer)) {
      // Convert first leter to uppercase
      let capAnswer = answer.replace(/^\w/, cap => cap.toUpperCase());
      types.push(capAnswer);
    }
  }
  // Add new types to viewdata
  req.session.viewData.questions.type.answer = types;

  return res.render('./prototypes/vts-changes/summary/index', { viewData: req.session.viewData });
};

/**
 * GET Middleware - Render confirmation
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
const getConfirmation = exports.getConfirmation = (req, res) => {
  return res.render('./prototypes/vts-changes/confirmation/index');
};