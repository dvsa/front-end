"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getReview = void 0;
var _helpers = require("./helpers");
const getReview = (req, res) => {
  return (0, _helpers.renderViewWithValuesOrRedirect)(req, res, 'prototypes/create-account/review');
};
exports.getReview = getReview;