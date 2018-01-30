'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderWithErrorsOrRedirectWithSession = exports.renderViewWithValuesOrRedirect = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _check = require('express-validator/check');

var _sessionHelpers = require('./session-helpers');

var _formHelpers = require('./form-helpers');

const renderViewWithValuesOrRedirect = exports.renderViewWithValuesOrRedirect = (req, res, viewName, viewData = {}) => {
  // Check if first request is email
  const isEmailPath = req.path === '/prototypes/create-account/email' ? true : false;
  const isReviewPath = req.path === '/prototypes/create-account/review' ? true : false;

  // Check if email request path or session has create form data
  if (isEmailPath || req.session && req.session.createAccountForm) {
    // Review page requires all steps to be completed
    if (isReviewPath && !req.session.createAccountForm.hasAllRequiredKeys) {
      return res.redirect('/prototypes/create-account/email');
    }
    // Render view with session values
    return res.render(viewName, _extends({
      values: req.session.createAccountForm
    }, viewData));
  }

  return res.redirect('/prototypes/create-account');
};

const renderWithErrorsOrRedirectWithSession = exports.renderWithErrorsOrRedirectWithSession = (req, res, viewName, redirectUrl) => {
  const errors = (0, _check.validationResult)(req);
  const values = (0, _formHelpers.filterFormData)(req.body);

  if (!errors.isEmpty()) {
    return res.render(viewName, {
      errors: errors.mapped(),
      values
    });
  }

  req.session = (0, _sessionHelpers.addFormValuesToSession)(req.session, values);

  if (req.session.createAccountForm && req.session.createAccountForm.hasAllRequiredKeys) {
    return res.redirect('/prototypes/create-account/review');
  }

  return res.redirect(redirectUrl);
};