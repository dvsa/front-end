"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterFormData = exports.allSecurityQuestions = exports.allRequiredKeys = void 0;
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
var allRequiredKeys = exports.allRequiredKeys = function allRequiredKeys() {
  return ['email', 'firstname', 'lastname', 'day', 'month', 'year', 'address1', 'townOrCity', 'postCode', 'phoneNumber', 'password', 'questionOne', 'questionOneAnswer', 'questionTwo', 'questionTwoAnswer'];
};
var allSecurityQuestions = exports.allSecurityQuestions = function allSecurityQuestions() {
  return [{
    value: 'select',
    text: 'Please select'
  }, {
    value: 1,
    text: 'What did you want to be when you grew up?'
  }, {
    value: 2,
    text: 'What was the name of your first pet?'
  }, {
    value: 3,
    text: 'Who was your first kiss?'
  }, {
    value: 4,
    text: 'Where did you go on your first memorable holiday?'
  }];
};
var filterFormData = exports.filterFormData = function filterFormData(formData) {
  if (!formData) return false;

  // List of all allowed form values
  var requiredKeys = allRequiredKeys();
  var allowKeys = [].concat(_toConsumableArray(requiredKeys), ['emailConfirmation', 'middlename', 'address2', 'address3', 'passwordConfirmation']);

  // Temporary object for later use
  var filteredValues = {};

  // Loop through each value in form data object
  Object.keys(formData).forEach(function (key, index) {
    // If it is in the allowed list
    // add it to the temp variable
    if (allowKeys.indexOf(key) !== -1) {
      filteredValues[key] = formData[key];
    }
  });

  // Return all filtered data
  return filteredValues;
};