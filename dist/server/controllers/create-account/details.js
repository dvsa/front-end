"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postDetails = exports.getDetails = void 0;
var _helpers = require("./helpers");
const getDetails = (req, res) => {
  return (0, _helpers.renderViewWithValuesOrRedirect)(req, res, 'prototypes/create-account/details');
};
exports.getDetails = getDetails;
const postDetails = (req, res) => {
  return (0, _helpers.renderWithErrorsOrRedirectWithSession)(req, res, 'prototypes/create-account/details', '/prototypes/create-account/contact-details');
};
exports.postDetails = postDetails;