'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postEmail = exports.getEmail = undefined;

var _helpers = require('./helpers');

const getEmail = exports.getEmail = (req, res) => {
  return (0, _helpers.renderViewWithValuesOrRedirect)(req, res, 'prototypes/create-account/email');
};

const postEmail = exports.postEmail = (req, res) => {
  return (0, _helpers.renderWithErrorsOrRedirectWithSession)(req, res, 'prototypes/create-account/email', '/prototypes/create-account/details');
};