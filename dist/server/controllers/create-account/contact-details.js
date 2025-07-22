"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postContactDetails = exports.getContactDetails = void 0;
var _helpers = require("./helpers");
var getContactDetails = exports.getContactDetails = function getContactDetails(req, res) {
  return (0, _helpers.renderViewWithValuesOrRedirect)(req, res, 'prototypes/create-account/contact-details');
};
var postContactDetails = exports.postContactDetails = function postContactDetails(req, res) {
  return (0, _helpers.renderWithErrorsOrRedirectWithSession)(req, res, 'prototypes/create-account/contact-details', '/prototypes/create-account/security-questions');
};