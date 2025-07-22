"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postSecurityQuestions = exports.getSecurityQuestions = void 0;
var _helpers = require("./helpers");
var getSecurityQuestions = exports.getSecurityQuestions = function getSecurityQuestions(req, res) {
  return (0, _helpers.renderViewWithValuesOrRedirect)(req, res, 'prototypes/create-account/security-questions', {
    securityQuestions: (0, _helpers.allSecurityQuestions)()
  });
};
var postSecurityQuestions = exports.postSecurityQuestions = function postSecurityQuestions(req, res) {
  return (0, _helpers.renderWithErrorsOrRedirectWithSession)(req, res, 'prototypes/create-account/security-questions', '/prototypes/create-account/password', {
    securityQuestions: (0, _helpers.allSecurityQuestions)()
  });
};