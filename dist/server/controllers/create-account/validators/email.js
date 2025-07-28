"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.emailValidationChecks = void 0;
var _check = require("express-validator/check");
const emailValidationChecks = exports.emailValidationChecks = [(0, _check.check)('email').exists().trim().normalizeEmail().isEmail().withMessage('Email address must be a valid email address').custom((value, {
  req
}) => value === req.body.emailConfirmation).withMessage('Does not match the confirmation email address'), (0, _check.check)('emailConfirmation').exists().custom((value, {
  req
}) => value === req.body.email).withMessage('Confirmation does not match original email address')];