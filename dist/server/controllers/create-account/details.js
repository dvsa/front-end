'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postDetails = exports.getDetails = undefined;

var _helpers = require('./helpers');

const getDetails = exports.getDetails = (req, res) => {
  return (0, _helpers.renderViewWithValuesOrRedirect)(req, res, 'prototypes/create-account/details');
};

const postDetails = exports.postDetails = (req, res) => {
  return (0, _helpers.renderWithErrorsOrRedirectWithSession)(req, res, 'prototypes/create-account/details', '/prototypes/create-account/contact-details');
};