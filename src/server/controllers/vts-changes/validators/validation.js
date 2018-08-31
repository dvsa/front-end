import { isEmpty } from '../helpers/helpers';

/**
 * Validation middleware function used to populate errors on
 * equipment type
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 * @param {Express.Next} - Express Next object
 */
export const validateType = (req, res, next) => {
  // Get submitted values
  const formData = req.body;
  // Remove any that are null (eg submit button)
  delete formData['null'];

  // If form data is empty...
  if (isEmpty(formData)) {
    // Pass on with errors in session
    req.session.viewData.questions.type.errors.push({ typeError: 'Choose an equipment type' });
    return next();
  }
  // If no errors, reset and pass on
  req.session.viewData.questions.type.errors = [];
  return next();
};

/**
 * Validation middleware function used to populate errors on
 * Approved equipment question
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 * @param {Express.Next} - Express Next object
 */
export const validateApproved = (req, res, next) => {
  // Get submitted values
  const formData = req.body;
  // Remove any that are null (eg submit button)
  delete formData['null'];

  // If form data is empty...
  if (isEmpty(formData)) {
    // Pass on with errors in session
    req.session.viewData.questions.approved.errors.push({ approvedError: 'Select an answer' }); 
    return next();
  }
  // If no errors, empty errors and pass on
  req.session.viewData.questions.approved.errors = [];
  return next();
};

/**
 * Validation middleware function used to populate errors on
 * Layout change question
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 * @param {Express.Next} - Express Next object
 */
export const validateLayout = (req, res, next) => {
  // Get submitted values
  const formData = req.body;
  // Remove any that are null (eg submit button)
  delete formData['null'];

  // If form data is empty...
  if (isEmpty(formData)) {
    // Pass on with errors in session
    req.session.viewData.questions.layout.errors.push({ layoutError: 'Select an answer' });
    return next();
  }
  // If no errors, empty errors and pass on
  req.session.viewData.questions.layout.errors = [];
  return next();
};

/**
 * Validation middleware function used to populate errors on
 * Classes question
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 * @param {Express.Next} - Express Next object
 */
export const validateClasses = (req, res, next) => {
  // Get submitted values
  const formData = req.body;
  // Remove any that are null (eg submit button)
  delete formData['null'];

  // If form data is empty...
  if (isEmpty(formData)) {
    // Pass on with errors in session
    req.session.viewData.questions.classes.errors.push({ classesError: 'Select an answer' });
    return next();
  }
  // If no errors, empty errors and pass on
  req.session.viewData.questions.classes.errors = [];
  return next();
};
