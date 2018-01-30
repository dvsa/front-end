'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const getRoot = exports.getRoot = (req, res) => {
  // Reset session
  if (req.session && req.session.createAccountForm) {
    req.session.createAccountForm = {};
  }
  return res.render('prototypes/create-account/index');
};