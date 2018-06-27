import { validateEmail, validateWord, isPassword } from './validation-functions';

// Reset password GET, collect users email
export function resetPasswordGet(req, res) {
  let viewData, emailError;

  emailError = req.session.emailError;

  viewData = {
    emailError,
  };
  return res.render('prototypes/learner/v10/authentication/reset-password', viewData);
}

// Reset password POST
export function resetPasswordPost(req, res) {
  const { email } = req.body;
  let redirectPath;

  if (validateEmail(email)) {
    redirectPath = '/prototypes/learner/v10/email-sent';
  } else {
    req.session.emailError = true;
    redirectPath = '/prototypes/learner/v10/reset-password';
  }

  return res.redirect(redirectPath);
}

// Reset email sent
export function emailSentGet(req, res) {
  let viewData;
  viewData = {};
  return res.render('prototypes/learner/v10/authentication/email-sent', viewData);
}

// enter new password
export function enterNewPasswordGet(req, res) {
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
    passwordErrorInputMessageTwo,
  };
  return res.render('prototypes/learner/v10/authentication/enter-new-password', viewData);
}

// Reset password POST
export function enterNewPasswordPost(req, res) {
  const { newPassword, confirmNewPassword } = req.body;
  let redirectPath, passwordError, passwordErrorTopMessage, passwordErrorInputMessageOne, passwordErrorInputMessageTwo;

  if (!isPassword(newPassword)) {
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
    redirectPath = '/prototypes/learner/v10/enter-new-password';
  } else {
    // all good!
    redirectPath = '/prototypes/learner/v10/reset-success';
  }

  return res.redirect(redirectPath);
}
// reset success
export function resetSuccessGet(req, res) {
  let viewData;
  viewData = {};
  return res.render('prototypes/learner/v10/authentication/reset-success', viewData);
}

// create new password
export function createNewPasswordGet(req, res) {
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
    passwordErrorInputMessageTwo,
  };
  return res.render('prototypes/learner/v10/authentication/create-new-password', viewData);
}

// Reset password POST
export function createNewPasswordPost(req, res) {
  const { newPassword, confirmNewPassword } = req.body;
  let redirectPath, passwordError, passwordErrorTopMessage, passwordErrorInputMessageOne, passwordErrorInputMessageTwo;

  if (!isPassword(newPassword)) {
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
    redirectPath = '/prototypes/learner/v10/create-new-password';
  } else {
    // all good!
    redirectPath = '/prototypes/learner/v10/create-success';
  }

  return res.redirect(redirectPath);
}

// create success
export function createSuccessGet(req, res) {
  let viewData;
  viewData = {};
  return res.render('prototypes/learner/v10/authentication/create-success', viewData);
}
