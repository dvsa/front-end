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
exports.createNewPasswordGet = createNewPasswordGet;
exports.createNewPasswordPost = createNewPasswordPost;
exports.createSuccessGet = createSuccessGet;

var _validationFunctions = require('./validation-functions');

// Reset password GET, collect users email
function resetPasswordGet(req, res) {
  let viewData, emailError;

  emailError = req.session.emailError;

  viewData = {
    emailError
  };
  return res.render('prototypes/learner/v6/authentication/reset-password', viewData);
}

// Reset password POST
function resetPasswordPost(req, res) {
  const { email } = req.body;
  let redirectPath;

  if ((0, _validationFunctions.validateEmail)(email)) {
    redirectPath = '/prototypes/learner/v6/email-sent';
  } else {
    req.session.emailError = true;
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
  let viewData, passwordError, passwordErrorTopMessage, passwordErrorInputMessageOne, passwordErrorInputMessageTwo;

  passwordError = req.session.passwordError;
  passwordErrorTopMessage = req.session.passwordErrorTopMessage;
  passwordErrorInputMessageOne = req.session.passwordErrorInputMessageOne;
  passwordErrorInputMessageTwo = req.session.passwordErrorInputMessageTwo;

  // reset
  req.session.passwordError = null;
  req.session.passwordErrorTopMessage = null;
  req.session.passwordErrorInputMessageOne = null;
  req.session.passwordErrorInputMessageTwo = null;

  viewData = {
    passwordError,
    passwordErrorTopMessage,
    passwordErrorInputMessageOne,
    passwordErrorInputMessageTwo
  };
  return res.render('prototypes/learner/v6/authentication/enter-new-password', viewData);
}

// Reset password POST
function enterNewPasswordPost(req, res) {
  const { newPassword, confirmNewPassword } = req.body;
  let redirectPath, passwordError, passwordErrorTopMessage, passwordErrorInputMessageOne, passwordErrorInputMessageTwo;

  if (!(0, _validationFunctions.isPassword)(newPassword)) {
    passwordError = true;
    passwordErrorTopMessage = 'Password is invalid';
    passwordErrorInputMessageOne = 'Enter a valid password';
  } else if (newPassword !== confirmNewPassword) {
    passwordError = true;
    passwordErrorTopMessage = 'Passwords do not match';
    passwordErrorInputMessageTwo = 'Enter a matching password';
  }

  if (passwordError === true) {
    req.session.passwordError = true;
    req.session.passwordErrorTopMessage = passwordErrorTopMessage;
    req.session.passwordErrorInputMessageOne = passwordErrorInputMessageOne;
    req.session.passwordErrorInputMessageTwo = passwordErrorInputMessageTwo;
    redirectPath = '/prototypes/learner/v6/enter-new-password';
  } else {
    // all good!
    redirectPath = '/prototypes/learner/v6/reset-success';
  }

  return res.redirect(redirectPath);
}
// reset success
function resetSuccessGet(req, res) {
  let viewData;
  viewData = {};
  return res.render('prototypes/learner/v6/authentication/reset-success', viewData);
}

// create new password
function createNewPasswordGet(req, res) {
  let viewData, passwordError, passwordErrorTopMessage, passwordErrorInputMessageOne, passwordErrorInputMessageTwo;

  passwordError = req.session.passwordError;
  passwordErrorTopMessage = req.session.passwordErrorTopMessage;
  passwordErrorInputMessageOne = req.session.passwordErrorInputMessageOne;
  passwordErrorInputMessageTwo = req.session.passwordErrorInputMessageTwo;

  // reset
  req.session.passwordError = null;
  req.session.passwordErrorTopMessage = null;
  req.session.passwordErrorInputMessageOne = null;
  req.session.passwordErrorInputMessageTwo = null;

  viewData = {
    passwordError,
    passwordErrorTopMessage,
    passwordErrorInputMessageOne,
    passwordErrorInputMessageTwo
  };
  return res.render('prototypes/learner/v6/authentication/create-new-password', viewData);
}

// Reset password POST
function createNewPasswordPost(req, res) {
  const { newPassword, confirmNewPassword } = req.body;
  let redirectPath, passwordError, passwordErrorTopMessage, passwordErrorInputMessageOne, passwordErrorInputMessageTwo;

  if (!(0, _validationFunctions.isPassword)(newPassword)) {
    passwordError = true;
    passwordErrorTopMessage = 'Password is invalid';
    passwordErrorInputMessageOne = 'Enter a valid password';
  } else if (newPassword !== confirmNewPassword) {
    passwordError = true;
    passwordErrorTopMessage = 'Passwords do not match';
    passwordErrorInputMessageTwo = 'Enter a matching password';
  }

  if (passwordError === true) {
    req.session.passwordError = true;
    req.session.passwordErrorTopMessage = passwordErrorTopMessage;
    req.session.passwordErrorInputMessageOne = passwordErrorInputMessageOne;
    req.session.passwordErrorInputMessageTwo = passwordErrorInputMessageTwo;
    redirectPath = '/prototypes/learner/v6/create-new-password';
  } else {
    // all good!
    redirectPath = '/prototypes/learner/v6/create-success';
  }

  return res.redirect(redirectPath);
}

// create success
function createSuccessGet(req, res) {
  let viewData;
  viewData = {};
  return res.render('prototypes/learner/v6/authentication/create-success', viewData);
}