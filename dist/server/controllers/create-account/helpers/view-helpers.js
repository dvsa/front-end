"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderWithErrorsOrRedirectWithSession = exports.renderViewWithValuesOrRedirect = void 0;
var _check = require("express-validator/check");
var _sessionHelpers = require("./session-helpers");
var _formHelpers = require("./form-helpers");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const renderViewWithValuesOrRedirect = (req, res, viewName, viewData = {}) => {
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
    return res.render(viewName, _objectSpread({
      values: req.session.createAccountForm
    }, viewData));
  }
  return res.redirect('/prototypes/create-account');
};
exports.renderViewWithValuesOrRedirect = renderViewWithValuesOrRedirect;
const renderWithErrorsOrRedirectWithSession = (req, res, viewName, redirectUrl, viewData = {}) => {
  const errors = (0, _check.validationResult)(req);
  const values = (0, _formHelpers.filterFormData)(req.body);
  if (!errors.isEmpty()) {
    return res.render(viewName, _objectSpread({
      errors: errors.mapped(),
      values
    }, viewData));
  }
  req.session = (0, _sessionHelpers.addFormValuesToSession)(req.session, values);
  if (req.session.createAccountForm && req.session.createAccountForm.hasAllRequiredKeys) {
    return res.redirect('/prototypes/create-account/review');
  }
  return res.redirect(redirectUrl);
};
exports.renderWithErrorsOrRedirectWithSession = renderWithErrorsOrRedirectWithSession;