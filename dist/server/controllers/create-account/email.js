"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postEmail = exports.getEmail = void 0;
var _helpers = require("./helpers");
const getEmail = (req, res) => {
  return (0, _helpers.renderViewWithValuesOrRedirect)(req, res, 'prototypes/create-account/email');
};
exports.getEmail = getEmail;
const postEmail = (req, res) => {
  return (0, _helpers.renderWithErrorsOrRedirectWithSession)(req, res, 'prototypes/create-account/email', '/prototypes/create-account/details');
};
exports.postEmail = postEmail;