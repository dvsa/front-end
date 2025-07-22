"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postDetails = exports.getDetails = void 0;
var _helpers = require("./helpers");
var getDetails = exports.getDetails = function getDetails(req, res) {
  return (0, _helpers.renderViewWithValuesOrRedirect)(req, res, 'prototypes/create-account/details');
};
var postDetails = exports.postDetails = function postDetails(req, res) {
  return (0, _helpers.renderWithErrorsOrRedirectWithSession)(req, res, 'prototypes/create-account/details', '/prototypes/create-account/contact-details');
};