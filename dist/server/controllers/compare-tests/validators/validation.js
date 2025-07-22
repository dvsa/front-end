"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateDetails = exports.validateAssessmentPost = exports.validateActivity = void 0;
var _getLastInUrl = require("../helpers/getLastInUrl");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Returns boolean based on string length
 *
 * @param {String} val - String to determine length on
 * @returns {Boolean} - Boolean on wether item has a value
 */
var isPopulated = function isPopulated(val) {
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
var isLessThan = function isLessThan(val, maxInt) {
  return val.length < maxInt;
};

/**
 * Validation middleware function used to populate errors on
 * site review assessment POST
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 * @param {Express.Next} - Express Next object
 */
var validateAssessmentPost = exports.validateAssessmentPost = function validateAssessmentPost(req, res, next) {
  var assessmentType = (0, _getLastInUrl.getLastInUrl)(req);

  // If radio group not populated
  var radioValue = req.body['radio-assessment-group'];

  // If radio value is not populated
  if (!radioValue) {
    // Push a new error to session errors
    req.session.viewData[assessmentType].errors.push({
      radioGroup: 'Choose an outcome'
    });
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
        req.session.viewData[assessmentType].errors.push({
          textareaImprove: 'Provide actions'
        });
      } else if (!isLessThan(req.body['improve-textarea'], 250)) {
        // If textarea exceeds limit of 2500
        // Add an error
        req.session.viewData[assessmentType].errors.push({
          textareaImprove: 'Enter up to 250 characters'
        });
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
        req.session.viewData[assessmentType].errors.push({
          textareaUnsatisfactory: 'Provide actions'
        });
      } else if (!isLessThan(req.body['unsatisfactory-advice-textarea'], 250)) {
        // If textarea exceeds limit of 2500
        // Add an error
        req.session.viewData[assessmentType].errors.push({
          textareaUnsatisfactory: 'Enter up to 250 characters'
        });
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
        req.session.viewData[assessmentType].errors.push({
          textareaSatisfactory: 'Enter up to 250 characters'
        });
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
var validateActivity = exports.validateActivity = function validateActivity(req, res, next) {
  // Reset formData
  req.session.viewData.activity.formData = {};

  // Resets errors
  req.session.viewData.activity.errors = [];

  // Sets up variable for catching radio value
  var activityRadioResponse = req.body['radio-activity'];

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
var validateDetails = exports.validateDetails = function validateDetails(req, res, next) {
  // Date keys
  var day = req.body['testDay'];
  var month = req.body['testMonth'];
  var year = req.body['testYear'];

  // Validation rules for date - return booleans for each
  var dayValid = day.length <= 2 && day.length != 0;
  var monthValid = month.length >= 1 && month.length <= 2 && month <= 12;
  var yearValid = year.length == 4 && /^\d+$/.test(year);
  var dateValid = dayValid && monthValid && yearValid;

  // Persists form fields on reload
  req.session.viewData.testerDetails = _objectSpread({}, req.body);

  // New array for errors
  req.session.viewData.testerDetails.errors = [];

  // Calls the next middleware method in the stack
  next();
};