'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.passwordValidationChecks = undefined;

var _check = require('express-validator/check');

const passwordValidationChecks = exports.passwordValidationChecks = [(0, _check.check)('password').exists().trim().not().isEmail().withMessage('Password cannot be empty').isLength({ min: 8 }).withMessage('Password must be atleast 8 characters').custom((value, { req }) => value === req.body.passwordConfirmation).withMessage('Password does not match confirmation'), (0, _check.check)('passwordConfirmation').exists().not().isEmpty().withMessage('Password confirmation cannot be empty').custom((value, { req }) => value === req.body.password).withMessage('Confirmation does not match original password')];