"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.securityQuestions = void 0;
var _check = require("express-validator/check");
var securityQuestions = exports.securityQuestions = [(0, _check.check)('questionOne').exists().not().isEmpty().not().contains('select').withMessage('Question one cannot be empty'), (0, _check.check)('questionOneAnswer').exists().not().isEmpty().withMessage('Question one answer cannot be empty'), (0, _check.check)('questionTwo').exists().not().isEmpty().not().contains('select').withMessage('Question two cannot be empty').custom(function (value, _ref) {
  var req = _ref.req;
  return value !== req.body.questionOne;
}).withMessage('Question two cannot be the same as question one'), (0, _check.check)('questionTwoAnswer').exists().not().isEmpty().withMessage('Question two answer cannot be empty')];