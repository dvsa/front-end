'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.indexGet = indexGet;
exports.indexPost = indexPost;
// import path from 'path';
// import { CONFIG } from './../../config/constants';

// Start: GET
function indexGet(req, res) {
  // return res.render('protoypes/index', '.path/to/data/if/required');
  // return res.render('prototypes/learner/v1/index', { loggedOut: false });

  let viewData, signinError;

  signinError = req.session.signinError;
  req.session.signinError = '';

  console.log('signinError = ' + signinError);

  viewData = {
    signinError
  };

  /*let clearSession = res.param('clearSession');
  if (clearSession === 'true') {
    console.log('session cleared');
  }
   let errorFirstName = req.session.errorFirstName,
    errorLastName = req.session.errorLastName,
    errorNames = req.session.errorNames,
    firstName = req.session.firstName,
    lastName = req.session.lastName;
   // firstName = 'DaveTest';
  console.log('firstName = ' + firstName);
   let viewData;
   viewData = {
    firstName,
    lastName,
  };
   if (errorNames === true) {
    viewData += {
      errorFirstName,
      errorLastName,
      errorNames,
    };
     req.session.errorFirstName = req.session.errorLastName = req.session.errorNames = '';
  }*/

  return res.render('prototypes/learner/v1/index', viewData);
}

// Start: POST
function indexPost(req, res) {
  const { email, password } = req.body;

  console.log('email = ' + email);
  console.log('password = ' + password);

  let signinError;

  if (email === 'test@example.com' && password === 'password') {
    return res.redirect('/prototypes/learner/v1/home');
  } else {
    signinError = true;
    req.session.signinError = signinError;
    return res.redirect('/prototypes/learner/v1/');
  }

  /*let errorNames, errorFirstName, errorLastName;
   req.session.firstName = firstName;
  req.session.lastName = lastName;
  
  if (!validateWord(firstName)) {
    errorNames = true;
    errorFirstName = true;
  }
   if (!validateWord(lastName)) {
    errorNames = true;
    errorLastName = true;
  }*/

  /*if (errorNames === true) {
    req.session.errorFirstName = errorFirstName;
    req.session.errorLastName = errorLastName;
    req.session.errorNames = errorNames;
    return res.redirect('/demo');
  } else {
    return res.redirect('/demo/address');
  }*/
  return res.redirect('/prototypes/learner/v1/');
}