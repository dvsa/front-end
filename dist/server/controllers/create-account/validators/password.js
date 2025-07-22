"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.passwordValidationChecks = void 0;
var _check = require("express-validator/check");
var weakPasswordMessage = 'Your password cannot contain; username, personal information or any blocked words';
var passwordValidationChecks = exports.passwordValidationChecks = [(0, _check.check)('password').trim().exists().withMessage('Password cannot be empty').isLength({
  min: 8
}).withMessage('Password must be atleast 8 characters')
// Blocked words check
.custom(function (value, _ref) {
  var req = _ref.req;
  var blockedWords = ['password', 'animal', 'cat', 'dog'];
  return !blockedWords.includes(value);
}).withMessage('Password contains a blocked word')
// Personal details check
.custom(function (value, _ref2) {
  var req = _ref2.req;
  var items = ['email', 'firstname', 'middlename', 'lastname'];
  var isValid = true;
  items.forEach(function (item) {
    console.log(req.session.createAccountForm[item]);
    if (req.session && req.session.createAccountForm && req.session.createAccountForm[item]) {
      var itemValue = req.session.createAccountForm[item];
      if (!itemValue) return;
      var itemLowercase = itemValue.toLowerCase();
      var itemUppercase = itemValue.toUpperCase();
      if (value.includes(itemLowercase) || value.includes(itemLowercase) || value.includes(itemValue)) {
        isValid = false;
      }
    }
  });
  return isValid;
}).withMessage('Please cannot contain any personal details')
// Contains mixed characters
.custom(function (value, _ref3) {
  var req = _ref3.req;
  return /^(?=.*[a-z])(?=.*[A-Z]).+$/.test(value);
}).withMessage('Password must contain both uppercase and lowercase characers')
// Has numeric value
.custom(function (value, _ref4) {
  var req = _ref4.req;
  return /[0-9]/.test(value);
}).withMessage('Password must contain atleast 1 number')
// Check it matches confirmation
.custom(function (value, _ref5) {
  var req = _ref5.req;
  return value === req.body.passwordConfirmation;
}).withMessage('Password does not match confirmation'), (0, _check.check)('passwordConfirmation').exists().withMessage('Password confirmation cannot be empty').custom(function (value, _ref6) {
  var req = _ref6.req;
  return value === req.body.password;
}).withMessage('Confirmation does not match original password')];