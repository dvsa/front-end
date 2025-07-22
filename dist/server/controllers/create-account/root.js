"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRoot = void 0;
var getRoot = exports.getRoot = function getRoot(req, res) {
  // Reset session
  if (req.session && req.session.createAccountForm) {
    req.session.createAccountForm = {};
  }
  return res.render('prototypes/create-account/index');
};