"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addFormValuesToSession = void 0;
var _formHelpers = require("./form-helpers");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const addFormValuesToSession = (session, formValues) => {
  const requiredKeys = (0, _formHelpers.allRequiredKeys)();
  let hasAllRequiredKeys = true;

  // Update values
  const formValueKeys = Object.keys(formValues);
  formValueKeys.forEach(key => {
    // Show readable security questions
    if (key === 'questionOne' || key === 'questionTwo') {
      const value = formValues[key];
      const questions = (0, _formHelpers.allSecurityQuestions)();
      let question = '';
      questions.forEach(item => {
        if (value == item.value) {
          question = item.text;
        }
      });
      formValues[`${key}Readable`] = question;
    }

    // Convert password to symbols
    if (key === 'password') {
      const value = String(formValues[key]);
      let passwordInSymbols = '';
      for (let i = 0; i < value.length; i++) {
        passwordInSymbols += '&bull;';
      }
      formValues[`${key}Readable`] = passwordInSymbols;
    }
  });

  // Append form values to session
  session.createAccountForm = _objectSpread(_objectSpread({}, session.createAccountForm), formValues);

  // Get all keys from session
  const allSessionDataKeys = Object.keys(session.createAccountForm);

  // Check all required keys are present
  requiredKeys.forEach(key => {
    if (allSessionDataKeys.indexOf(key) === -1) {
      hasAllRequiredKeys = false;
      return;
    }
  });
  session.createAccountForm.hasAllRequiredKeys = hasAllRequiredKeys;
  return session;
};
exports.addFormValuesToSession = addFormValuesToSession;