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
    req.session.viewData[assessmentType].errors.push({ radioGroup: 'You must choose an outcome' });
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
        req.session.viewData[assessmentType].errors.push({ textareaImprove: 'You must provide actions' });
      }

      // If textarea exceeds limit of 2500
      else if (!isLessThan(req.body['improve-textarea'], 250)) {
          // Add an error
          req.session.viewData[assessmentType].errors.push({ textareaImprove: 'You are not allowed more than 250 characters' });
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
        req.session.viewData[assessmentType].errors.push({ textareaUnsatisfactory: 'You must provide actions' });
      }

      // If textarea exceeds limit of 2500
      else if (!isLessThan(req.body['unsatisfactory-advice-textarea'], 250)) {
          // Add an error
          req.session.viewData[assessmentType].errors.push({ textareaUnsatisfactory: 'You are not allowed more than 250 characters' });
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
        req.session.viewData[assessmentType].errors.push({ textareaSatisfactory: 'You are not allowed more than 250 characters' });
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
      radioGroup: 'You must choose a result'
    });
    // Calls the next middleware method in the stack
    next();
  }

  // If response is equal to yes
  if (activityRadioResponse == 'yes') {
    // Set activity response to true
    req.session.viewData.activity.formData.activityIsPerformed = true;

    // Assigns text input to variable
    req.session.viewData.activity.formData.testNum = req.body['test-number'];
  } else {
    // Set activity response to false
    req.session.viewData.activity.formData.activityIsNotPerformed = true;

    // Assigns activity dropdown value
    req.session.viewData.activity.formData.reason = req.body['reinspection-options'];
  }

  // If yes radio was selected & text input is not populated
  if (activityRadioResponse == 'yes' && !isPopulated(req.session.viewData.activity.formData.testNum)) {
    // Create new error and push to stack
    req.session.viewData.activity.errors.push({
      testNumber: 'You must add a test number'
    });
  }
  // If no radio was selected & reason was not selected
  else if (activityRadioResponse == 'no' && req.session.viewData.activity.formData.reason == '0') {
      // Create new error and push to stack
      req.session.viewData.activity.errors.push({
        activityDropdown: 'You must select why the activity was not performed'
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

  // Number of examiners
  let twoExaminers = req.body['twoExaminers']; // yes or no
  let examinerId = req.body['examinerId']; // yes or no

  // Persists form fields on reload
  req.session.viewData.testerDetails = _extends({}, req.body);
  // New array for errors
  req.session.viewData.testerDetails.errors = [];

  // Set property for two examiners result to check
  req.session.viewData.testerDetails.twoExaminers = twoExaminers;
  // Add examiner ID to session
  req.session.viewData.testerDetails.examinerId = examinerId;

  // Validation switch on examiners question. May need additional case for 'no'
  switch (twoExaminers) {
    // If two examiners...
    case 'yes':
      // Ensure Examiners' ID is populated (mandatory)
      if (!isPopulated(examinerId)) {
        // Add an error
        req.session.viewData.testerDetails.errors.push({ provideID: "You must provide the Examiner's User ID" });
      }
      break;
  }

  // Calls the next middleware method in the stack
  next();
};