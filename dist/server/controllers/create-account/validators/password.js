"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.passwordValidationChecks = void 0;
var _check = require("express-validator/check");
const weakPasswordMessage = 'Your password cannot contain; username, personal information or any blocked words';
const passwordValidationChecks = exports.passwordValidationChecks = [(0, _check.check)('password').trim().exists().withMessage('Password cannot be empty').isLength({
  min: 8
}).withMessage('Password must be atleast 8 characters')
// Blocked words check
.custom((value, {
  req
}) => {
  const blockedWords = ['password', 'animal', 'cat', 'dog'];
  return !blockedWords.includes(value);
}).withMessage('Password contains a blocked word')
// Personal details check
.custom((value, {
  req
}) => {
  const items = ['email', 'firstname', 'middlename', 'lastname'];
  let isValid = true;
  items.forEach(item => {
    console.log(req.session.createAccountForm[item]);
    if (req.session && req.session.createAccountForm && req.session.createAccountForm[item]) {
      const itemValue = req.session.createAccountForm[item];
      if (!itemValue) return;
      const itemLowercase = itemValue.toLowerCase();
      const itemUppercase = itemValue.toUpperCase();
      if (value.includes(itemLowercase) || value.includes(itemLowercase) || value.includes(itemValue)) {
        isValid = false;
      }
    }
  });
  return isValid;
}).withMessage('Please cannot contain any personal details')
// Contains mixed characters
.custom((value, {
  req
}) => {
  return /^(?=.*[a-z])(?=.*[A-Z]).+$/.test(value);
}).withMessage('Password must contain both uppercase and lowercase characers')
// Has numeric value
.custom((value, {
  req
}) => {
  return /[0-9]/.test(value);
}).withMessage('Password must contain atleast 1 number')
// Check it matches confirmation
.custom((value, {
  req
}) => value === req.body.passwordConfirmation).withMessage('Password does not match confirmation'), (0, _check.check)('passwordConfirmation').exists().withMessage('Password confirmation cannot be empty').custom((value, {
  req
}) => value === req.body.password).withMessage('Confirmation does not match original password')];