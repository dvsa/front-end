'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateDetails = exports.validateActivity = exports.validateAssessmentPost = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _getLastInUrl = require('../helpers/getLastInUrl');

/**
 * Returns boolean based on string length
 *
 * @param {String} val - String to determine length on
 * @returns {Boolean} - Boolean on wether item has a value
 */
const isPopulated = val => {
  // If val doesnt exist return false
  if (!val) return false;

  // Returns truthy / falsey value on string length being greater than 0
  return val.trim().length > 0;
};

/**
 * Compares the length of the string to a numeric value
 *
 * @param {String} val - String to determine length on
 * @param {Int} maxInt - Int to compare length to
 * @returns {Boolean} - Boolean on wether string length is greater than Int
 */
const isLessThan = (val, maxInt) => val.length < maxInt;

/**
 * Validation middleware function used to populate errors on
 * site review assessment POST
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 * @param {Express.Next} - Express Next object
 */
const validateAssessmentPost = exports.validateAssessmentPost = (req, res, next) => {
  let assessmentType = (0, _getLastInUrl.getLastInUrl)(req);

  // If radio group not populated
  let radioValue = req.body['radio-assessment-group'];

  // If radio value is not populated
  if (!radioValue) {
    // Push a new error to session errors
    req.session.viewData[assessmentType].errors.push({ radioGroup: 'Choose an outcome' });
    // Calls the next middleware method in the stack
    next();
  }

  radioValue = radioValue.toLowerCase();

  // Validation switch statement
  switch (radioValue) {
    // If radio select was improve
    case 'improve':
      // Ensure textarea is populated (mandatory)
      if (!isPopulated(req.body['improve-textarea'])) {
        // Add an error
        req.session.viewData[assessmentType].errors.push({ textareaImprove: 'Provide actions' });
      } else if (!isLessThan(req.body['improve-textarea'], 250)) {
        // If textarea exceeds limit of 2500
        // Add an error
        req.session.viewData[assessmentType].errors.push({ textareaImprove: 'Enter up to 250 characters' });
      } else {
        req.session.viewData[assessmentType].commitedLevel = 'Improve';
        req.session.viewData[assessmentType].commitedComment = req.body['improve-textarea'];
      }

      req.session.viewData[assessmentType][radioValue].comment = req.body['improve-textarea'];
      req.session.viewData[assessmentType][radioValue].isChecked = true;

      break;

    // If radio select was unsatisfactory
    case 'unsatisfactory':
      // Ensure textarea is populated (mandatory)
      if (!isPopulated(req.body['unsatisfactory-advice-textarea'])) {
        // Add an error
        req.session.viewData[assessmentType].errors.push({ textareaUnsatisfactory: 'Provide actions' });
      } else if (!isLessThan(req.body['unsatisfactory-advice-textarea'], 250)) {
        // If textarea exceeds limit of 2500
        // Add an error
        req.session.viewData[assessmentType].errors.push({ textareaUnsatisfactory: 'Enter up to 250 characters' });
      } else {
        req.session.viewData[assessmentType].commitedLevel = 'Unsatisfactory';
        req.session.viewData[assessmentType].commitedComment = req.body['unsatisfactory-advice-textarea'];
      }

      req.session.viewData[assessmentType][radioValue].comment = req.body['unsatisfactory-advice-textarea'];
      req.session.viewData[assessmentType][radioValue].isChecked = true;

      break;

    // If radio select was satisfactory
    case 'satisfactory':
      // Ensure textarea is populated (mandatory)
      if (!isLessThan(req.body['satisfactory-textarea'], 2500)) {
        // Add an error
        req.session.viewData[assessmentType].errors.push({ textareaSatisfactory: 'Enter up to 250 characters' });
      } else {
        req.session.viewData[assessmentType].commitedLevel = 'Satisfactory';
        req.session.viewData[assessmentType].commitedComment = req.body['satisfactory-textarea'];
      }

      req.session.viewData[assessmentType][radioValue].comment = req.body['satisfactory-textarea'];
      req.session.viewData[assessmentType][radioValue].isChecked = true;

      break;
  }

  // Calls the next middleware method in the stack
  next();
};

/**
 * Validation middleware function used to populate errors on
 * site review assessment activity POST
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 * @param {Express.Next} - Express Next object
 */
const validateActivity = exports.validateActivity = (req, res, next) => {
  // Reset formData
  req.session.viewData.activity.formData = {};

  // Resets errors
  req.session.viewData.activity.errors = [];

  // Sets up variable for catching radio value
  let activityRadioResponse = req.body['radio-activity'];

  // If radio selection not made
  if (!activityRadioResponse) {
    // Create new error and push to stack
    req.session.viewData.activity.errors.push({
      radioGroup: 'Choose a result'
    });

    // Calls the next middleware method in the stack
    next();
  }

  activityRadioResponse = activityRadioResponse.toLowerCase();

  switch (activityRadioResponse) {
    case 'yes':
      // Set activity response to true
      req.session.viewData.activity.formData.activityIsPerformed = true;

      // Asigns text input to variable
      req.session.viewData.activity.formData.testNum = req.body['test-number'];

      // Break from switch statement
      break;
    case 'no':
      // Set activity response to false
      req.session.viewData.activity.formData.activityIsNotPerformed = true;

      req.session.viewData.activity.formData.otherReason = req.body['activity-unperformed-comment'];

      // Break from switch statement
      break;
  }

  // If yes radio was selected & text input is not populated
  if (activityRadioResponse == 'yes' && !isPopulated(req.session.viewData.activity.formData.testNum)) {
    // Create new error and push to stack
    req.session.viewData.activity.errors.push({
      testNumber: 'Add a test number'
    });
  } else if (activityRadioResponse == 'no' && !req.session.viewData.activity.formData.otherReason) {
    // If option no radio was select & reason 5 (other was selected) & other textarea is not populated
    // Create new error and push to stack
    req.session.viewData.activity.errors.push({
      otherReason: 'Add why the activity was not performed'
    });
  }

  // Calls the next middleware method in the stack
  next();
};

/**
 * Validation middleware function used to populate errors on
 * site review assessment POST
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 * @param {Express.Next} - Express Next object
 */
const validateDetails = exports.validateDetails = (req, res, next) => {
  // Date keys
  const day = req.body['testDay'];
  const month = req.body['testMonth'];
  const year = req.body['testYear'];

  // Validation rules for date - return booleans for each
  const dayValid = day.length <= 2 && day.length != 0;
  const monthValid = month.length >= 1 && month.length <= 2 && month <= 12;
  const yearValid = year.length == 4 && /^\d+$/.test(year);
  const dateValid = dayValid && monthValid && yearValid;

  // Persists form fields on reload
  req.session.viewData.testerDetails = _extends({}, req.body);

  // New array for errors
  req.session.viewData.testerDetails.errors = [];

  // Calls the next middleware method in the stack
  next();
};