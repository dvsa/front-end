'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetPasswordGet = resetPasswordGet;
exports.resetPasswordPost = resetPasswordPost;
exports.emailSentGet = emailSentGet;
exports.enterNewPasswordGet = enterNewPasswordGet;
exports.enterNewPasswordPost = enterNewPasswordPost;
exports.resetSuccessGet = resetSuccessGet;

var _validationFunctions = require('./validation-functions');

// Reset password GET, collect users email
function resetPasswordGet(req, res) {
  let viewData;
  viewData = {};
  return res.render('prototypes/learner/v6/authentication/reset-password', viewData);
}

// Reset password POST
function resetPasswordPost(req, res) {
  const { email } = req.body;
  let redirectPath;

  if ((0, _validationFunctions.validateEmail)(email)) {
    redirectPath = '/prototypes/learner/v6/email-sent';
  } else {
    redirectPath = '/prototypes/learner/v6/reset-password';
  }

  return res.redirect(redirectPath);
}

// Reset email sent
function emailSentGet(req, res) {
  let viewData;
  viewData = {};
  return res.render('prototypes/learner/v6/authentication/email-sent', viewData);
}

// enter new password
function enterNewPasswordGet(req, res) {
  let viewData;
  viewData = {};
  return res.render('prototypes/learner/v6/authentication/enter-new-password', viewData);
}

// Reset password POST
function enterNewPasswordPost(req, res) {
  const { newPassword, confirmNewPassword } = req.body;
  let redirectPath;

  if (newPassword.length > 8 && newPassword == confirmNewPassword) {
    redirectPath = '/prototypes/learner/v6/reset-success';
  } else {
    redirectPath = '/prototypes/learner/v6/enter-new-password';
  }

  return res.redirect(redirectPath);
}

// reset success
function resetSuccessGet(req, res) {
  let viewData;
  viewData = {};
  return res.render('prototypes/learner/v6/authentication/reset-success', viewData);
}