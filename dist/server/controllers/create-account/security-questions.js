'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postSecurityQuestions = exports.getSecurityQuestions = undefined;

var _helpers = require('./helpers');

const getSecurityQuestions = exports.getSecurityQuestions = (req, res) => {
  return (0, _helpers.renderViewWithValuesOrRedirect)(req, res, 'prototypes/create-account/security-questions', {
    securityQuestions: (0, _helpers.allSecurityQuestions)()
  });
};

const postSecurityQuestions = exports.postSecurityQuestions = (req, res) => {
  return (0, _helpers.renderWithErrorsOrRedirectWithSession)(req, res, 'prototypes/create-account/security-questions', '/prototypes/create-account/password', {
    securityQuestions: (0, _helpers.allSecurityQuestions)()
  });
};