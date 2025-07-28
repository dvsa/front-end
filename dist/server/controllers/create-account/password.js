"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postPassword = exports.getPassword = void 0;
var _helpers = require("./helpers");
const getPassword = (req, res) => {
  // Only testing password route
  if (req.query.testPasswordJouneyOnly) {
    // Reset session with pre-filled data
    req.session.createAccountForm = {};
    req.session = (0, _helpers.addFormValuesToSession)(req.session, {
      errors: false,
      email: 'test@google.com',
      firstname: 'Test',
      lastname: 'Test',
      day: 1,
      month: 1,
      year: 1980,
      address1: '1 test road',
      townOrCity: 'London',
      postCode: 'SW1A 1AA',
      phoneNumber: '12345678910',
      questionOne: 1,
      questionOneAnswer: 'answer1',
      questionTwo: 2,
      questionTwoAnswer: 'answer2'
    });
    // Redirect back to password route
    return res.redirect('/prototypes/create-account/password');
  }
  return (0, _helpers.renderViewWithValuesOrRedirect)(req, res, 'prototypes/create-account/password');
};
exports.getPassword = getPassword;
const postPassword = (req, res) => {
  return (0, _helpers.renderWithErrorsOrRedirectWithSession)(req, res, 'prototypes/create-account/password', '/prototypes/create-account/review');
};
exports.postPassword = postPassword;