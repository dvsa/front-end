'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postContactDetails = exports.getContactDetails = undefined;

var _helpers = require('./helpers');

const getContactDetails = exports.getContactDetails = (req, res) => {
  return (0, _helpers.renderViewWithValuesOrRedirect)(req, res, 'prototypes/create-account/contact-details');
};

const postContactDetails = exports.postContactDetails = (req, res) => {
  return (0, _helpers.renderWithErrorsOrRedirectWithSession)(req, res, 'prototypes/create-account/contact-details', '/prototypes/create-account/security-questions');
};