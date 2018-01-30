'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addFormValuesToSession = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _formHelpers = require('./form-helpers');

const addFormValuesToSession = exports.addFormValuesToSession = (session, formValues) => {
  const requiredKeys = (0, _formHelpers.allRequiredKeys)();
  let hasAllRequiredKeys = true;

  // Update values
  const formValueKeys = Object.keys(formValues);

  formValueKeys.forEach(key => {
    // Show readable security questions
    if (key === 'questionOne' || key === 'questionTwo') {
      const value = formValues[key];
      const questions = (0, _formHelpers.allSecurityQuestions)();
      let question = '';
      questions.forEach(item => {
        if (value == item.value) {
          question = item.text;
        }
      });
      formValues[`${key}Readable`] = question;
    }

    // Convert password to symbols
    if (key === 'password') {
      const value = String(formValues[key]);
      let passwordInSymbols = '';

      for (let i = 0; i < value.length; i++) {
        passwordInSymbols += '&bull;';
      }

      formValues[`${key}Readable`] = passwordInSymbols;
    }
  });

  // Append form values to session
  session.createAccountForm = _extends({}, session.createAccountForm, formValues);

  // Get all keys from session
  const allSessionDataKeys = Object.keys(session.createAccountForm);

  // Check all required keys are present
  requiredKeys.forEach(key => {
    if (allSessionDataKeys.indexOf(key) === -1) {
      hasAllRequiredKeys = false;
      return;
    }
  });

  session.createAccountForm.hasAllRequiredKeys = hasAllRequiredKeys;

  return session;
};