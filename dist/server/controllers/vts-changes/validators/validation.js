"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateType = exports.validateStage = void 0;
var _helpers = require("../helpers/helpers");
var _getLastInUrl = require("../../site-review/helpers/getLastInUrl.js");
/**
 * Validation middleware function used to populate errors on
 * equipment type
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 * @param {Express.Next} - Express Next object
 */
const validateType = (req, res, next) => {
  // Get submitted values
  const formData = req.body;
  // Remove any that are null (eg submit button)
  delete formData['null'];

  // If form data is empty...
  if ((0, _helpers.isEmpty)(formData)) {
    // Pass on with errors in session
    req.session.viewData.questions.type.errors.push({
      error: 'Choose an equipment type'
    });
    return next();
  }
  // If no errors, reset and pass on
  req.session.viewData.questions.type.errors = [];
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
exports.validateType = validateType;
const validateStage = (req, res, next) => {
  const stageName = (0, _getLastInUrl.getLastInUrl)(req);
  // Get submitted values
  const formData = req.body;
  // Remove any that are null (eg submit button)
  delete formData['null'];

  // If form data is empty...
  if ((0, _helpers.isEmpty)(formData)) {
    // Pass on with errors in session
    req.session.viewData.questions[`${stageName}`].errors.push({
      error: 'Select an answer'
    });
    return next();
  }
  // If no errors, empty errors and pass on
  req.session.viewData.questions[`${stageName}`].errors = [];
  return next();
};
exports.validateStage = validateStage;