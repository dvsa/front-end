'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getReview = undefined;

var _helpers = require('./helpers');

const getReview = exports.getReview = (req, res) => {
  return (0, _helpers.renderViewWithValuesOrRedirect)(req, res, 'prototypes/create-account/review');
};