'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postPassword = exports.getPassword = undefined;

var _helpers = require('./helpers');

const getPassword = exports.getPassword = (req, res) => {
  return (0, _helpers.renderViewWithValuesOrRedirect)(req, res, 'prototypes/create-account/password');
};

const postPassword = exports.postPassword = (req, res) => {
  return (0, _helpers.renderWithErrorsOrRedirectWithSession)(req, res, 'prototypes/create-account/password', '/prototypes/create-account/review');
};