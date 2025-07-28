"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.detailsValidationChecks = void 0;
var _check = require("express-validator/check");
const detailsValidationChecks = exports.detailsValidationChecks = [(0, _check.check)('firstname').exists().not().isEmpty().withMessage('First name cannot be empty'), (0, _check.check)('lastname').not().isEmpty().withMessage('Last name cannot be empty'), (0, _check.check)('day').not().isEmpty().withMessage('Day field cannot be empty'), (0, _check.check)('month').not().isEmpty().withMessage('Month field cannot be empty'), (0, _check.check)('year').not().isEmpty().withMessage('Year field cannot be empty')];