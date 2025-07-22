"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postEmail = exports.getEmail = void 0;
var _helpers = require("./helpers");
var getEmail = exports.getEmail = function getEmail(req, res) {
  return (0, _helpers.renderViewWithValuesOrRedirect)(req, res, 'prototypes/create-account/email');
};
var postEmail = exports.postEmail = function postEmail(req, res) {
  return (0, _helpers.renderWithErrorsOrRedirectWithSession)(req, res, 'prototypes/create-account/email', '/prototypes/create-account/details');
};