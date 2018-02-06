'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.contactDetailsValidationChecks = undefined;

var _check = require('express-validator/check');

const contactDetailsValidationChecks = exports.contactDetailsValidationChecks = [(0, _check.check)('address1').exists().not().isEmpty().withMessage('Home address cannot be empty'), (0, _check.check)('townOrCity').exists().not().isEmpty().withMessage('Town or city cannot be empty'), (0, _check.check)('postCode').exists().not().isEmpty().withMessage('Post code cannot be empty'), (0, _check.check)('phoneNumber').exists().not().isEmpty().withMessage('Phone number cannot be empty')];