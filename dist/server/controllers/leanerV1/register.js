'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerEmailGet = registerEmailGet;
exports.registerEmailPost = registerEmailPost;
exports.registerPersonalGet = registerPersonalGet;
exports.registerPersonalPost = registerPersonalPost;
exports.registerJobGet = registerJobGet;
exports.registerJobPost = registerJobPost;
exports.registerJob2Get = registerJob2Get;
exports.registerJob2Post = registerJob2Post;
exports.registerPasswordGet = registerPasswordGet;
exports.registerPasswordPost = registerPasswordPost;
exports.registerReviewGet = registerReviewGet;
exports.registerReviewPost = registerReviewPost;
exports.registerCompleteGet = registerCompleteGet;

var _validationFunctions = require('./validation-functions');

let generalData = require('./data');

// **************************************************************************************
// Email: GET
// **************************************************************************************
// import generic validation functions
function registerEmailGet(req, res) {
  let viewData, email, email2, registrationEmailError, registrationEmailErrorMessage, mode, editMode, clearSession;

  email = req.session.email;
  registrationEmailError = req.session.registrationEmailError;
  registrationEmailErrorMessage = req.session.registrationEmailErrorMessage;

  clearSession = req.param('clearSession');
  if (clearSession === 'true') {
    return res.redirect('/prototypes/learner/v1');
  }

  mode = req.param('mode');
  console.log('mode = ' + mode);
  if (mode == 'edit') {
    email2 = email;
    editMode = true;
    req.session.editMode = true;
  }

  viewData = {
    email,
    email2,
    registrationEmailError,
    registrationEmailErrorMessage,
    editMode
  };

  return res.render('prototypes/learner/v1/registration/index', viewData);
}

// Email: POST
function registerEmailPost(req, res) {
  const { email, email2 } = req.body;

  let registrationEmailError, registrationEmailErrorMessage, editMode;
  req.session.email = email;
  editMode = req.session.editMode;

  if (!(0, _validationFunctions.validateEmail)(email)) {
    registrationEmailError = true;
    registrationEmailErrorMessage = 'Enter a valid email';
  }

  if (email !== email2) {
    registrationEmailError = true;
    registrationEmailErrorMessage = 'The email addresses do not match';
  }

  if (registrationEmailError === true) {
    req.session.registrationEmailError = registrationEmailError;
    req.session.registrationEmailErrorMessage = registrationEmailErrorMessage;
    return res.redirect('/prototypes/learner/v1/registration');
  } else {
    req.session.registrationEmailError = req.session.registrationEmailErrorMessage = null;
    if (editMode === true) {
      req.session.editMode = null;
      return res.redirect('/prototypes/learner/v1/registration/review');
    } else {
      return res.redirect('/prototypes/learner/v1/registration/personal-details');
    }
  }
}
// **************************************************************************************
// Personal details: GET
// **************************************************************************************
function registerPersonalGet(req, res) {
  let viewData, firstName, lastName, registrationPersonalError, registrationPersonalErrorFirstName, registrationPersonalErrorLastName, mode, editMode;

  firstName = req.session.firstName;
  lastName = req.session.lastName;
  registrationPersonalError = req.session.registrationPersonalError;
  registrationPersonalErrorFirstName = req.session.registrationPersonalErrorFirstName;
  registrationPersonalErrorLastName = req.session.registrationPersonalErrorLastName;

  mode = req.param('mode');
  if (mode == 'edit') {
    editMode = true;
    req.session.editMode = true;
  }

  viewData = {
    firstName,
    lastName,
    registrationPersonalError,
    registrationPersonalErrorFirstName,
    registrationPersonalErrorLastName,
    editMode
  };

  return res.render('prototypes/learner/v1/registration/personal-details/index', viewData);
}

// Personal details: POST
function registerPersonalPost(req, res) {
  const { firstName, lastName } = req.body;

  let registrationPersonalError, registrationPersonalErrorFirstName, registrationPersonalErrorLastName, editMode;
  req.session.firstName = firstName;
  req.session.lastName = lastName;

  editMode = req.session.editMode;

  if (!(0, _validationFunctions.validateWord)(firstName)) {
    registrationPersonalErrorFirstName = 'Enter a valid first name';
    registrationPersonalError = true;
  }

  if (!(0, _validationFunctions.validateWord)(lastName)) {
    registrationPersonalErrorLastName = 'Enter a valid last name';
    registrationPersonalError = true;
  }

  if (registrationPersonalError === true) {
    req.session.registrationPersonalErrorFirstName = registrationPersonalErrorFirstName;
    req.session.registrationPersonalErrorLastName = registrationPersonalErrorLastName;
    req.session.registrationPersonalError = registrationPersonalError;
    return res.redirect('/prototypes/learner/v1/registration/personal-details');
  } else {
    req.session.registrationPersonalErrorFirstName = req.session.registrationPersonalErrorLastName = req.session.registrationPersonalError = null;

    if (editMode === true) {
      req.session.editMode = null;
      return res.redirect('/prototypes/learner/v1/registration/review');
    } else {
      return res.redirect('/prototypes/learner/v1/registration/job-details');
    }
  }
}
// **************************************************************************************
// Job details 1: GET Department
// **************************************************************************************
function registerJobGet(req, res) {
  let viewData, departmentSelectOptions, registrationDepartmentError, mode, editMode, department;

  departmentSelectOptions = generalData.allDepartments;
  registrationDepartmentError = req.session.registrationDepartmentError;

  mode = req.param('mode');
  if (mode == 'edit') {
    editMode = true;
    req.session.editMode = true;
  }

  department = req.session.department;

  viewData = {
    departmentSelectOptions,
    registrationDepartmentError,
    department,
    editMode
  };

  return res.render('prototypes/learner/v1/registration/job-details/index', viewData);
}

// Job details: POST
function registerJobPost(req, res) {
  const { department } = req.body;

  let registrationDepartmentError, departmentSelectOptions, departmentName, editMode;
  departmentSelectOptions = generalData.allDepartments;

  for (let i = 0; i < departmentSelectOptions.length; i++) {
    if (departmentSelectOptions[i].value == department) departmentName = departmentSelectOptions[i].text;
  }

  editMode = req.session.editMode;

  if (parseInt(department) < 1) {
    registrationDepartmentError = true;
    req.session.registrationDepartmentError = registrationDepartmentError;
    return res.redirect('/prototypes/learner/v1/registration/job-details');
  } else {
    req.session.department = department;
    req.session.departmentName = departmentName;
    req.session.registrationDepartmentError = null;
    if (editMode === true) {
      req.session.editMode = null;
      return res.redirect('/prototypes/learner/v1/registration/review');
    } else {
      return res.redirect('/prototypes/learner/v1/registration/job-details/profession');
    }
  }
}
// **************************************************************************************
// Job2 details 2: GET  Profession and grade
// **************************************************************************************
function registerJob2Get(req, res) {
  let viewData, professionSelectOptions, registrationProfessionError, registrationGradeError, gradeSelectOptions, registrationJob2Error, profession, grade, mode, editMode;

  mode = req.param('mode');
  if (mode == 'edit') {
    editMode = true;
    req.session.editMode = true;
  }

  professionSelectOptions = generalData.allProfessions;
  gradeSelectOptions = generalData.allGrades;
  registrationJob2Error = req.session.registrationJob2Error;
  registrationProfessionError = req.session.registrationProfessionError;
  registrationGradeError = req.session.registrationGradeError;
  profession = req.session.profession;
  grade = req.session.grade;

  viewData = {
    professionSelectOptions,
    gradeSelectOptions,
    registrationProfessionError,
    registrationGradeError,
    registrationJob2Error,
    profession,
    grade,
    editMode
  };

  return res.render('prototypes/learner/v1/registration/job-details/profession', viewData);
}

// Job2 details: POST
function registerJob2Post(req, res) {
  const { profession, grade } = req.body;

  let registrationJob2Error, registrationProfessionError, registrationGradeError, professionSelectOptions, gradeSelectOptions, professionName, gradeName, editMode;
  professionSelectOptions = generalData.allProfessions;
  gradeSelectOptions = generalData.allGrades;

  req.session.profession = profession;
  req.session.grade = grade;

  editMode = req.session.editMode;

  for (let i = 0; i < professionSelectOptions.length; i++) {
    if (professionSelectOptions[i].value == profession) professionName = professionSelectOptions[i].text;
  }

  for (let i = 0; i < gradeSelectOptions.length; i++) {
    if (gradeSelectOptions[i].value == grade) gradeName = gradeSelectOptions[i].text;
  }

  req.session.professionName = professionName;
  req.session.gradeName = gradeName;

  if (parseInt(profession) < 1) {
    registrationJob2Error = true;
    registrationProfessionError = true;
  }

  if (parseInt(grade) < 1) {
    registrationJob2Error = true;
    registrationGradeError = true;
  }

  if (registrationJob2Error === true) {
    req.session.registrationJob2Error = registrationJob2Error;
    req.session.registrationGradeError = registrationGradeError;
    req.session.registrationProfessionError = registrationProfessionError;
    return res.redirect('/prototypes/learner/v1/registration/job-details/profession');
  } else {
    req.session.registrationJob2Error = false;
    req.session.registrationJob2Error = req.session.registrationGradeError = req.session.registrationProfessionError = null;

    if (editMode === true) {
      req.session.editMode = null;
      return res.redirect('/prototypes/learner/v1/registration/review');
    } else {
      return res.redirect('/prototypes/learner/v1/registration/password');
    }
  }
}
// **************************************************************************************
// Password GET
// **************************************************************************************
function registerPasswordGet(req, res) {
  let viewData, passwordError, passwordErrorMessage, passwordOneError, passwordTwoError, password, mode, editMode;

  passwordError = req.session.passwordError;
  passwordErrorMessage = req.session.passwordErrorMessage;
  passwordOneError = req.session.passwordOneError;
  passwordTwoError = req.session.passwordTwoError;
  password = req.session.password;

  mode = req.param('mode');
  if (mode == 'edit') {
    editMode = true;
    req.session.editMode = true;
  }

  viewData = {
    passwordError,
    passwordErrorMessage,
    passwordOneError,
    passwordTwoError,
    password,
    editMode
  };

  return res.render('prototypes/learner/v1/registration/password/index', viewData);
}

// password: POST
function registerPasswordPost(req, res) {
  const { passwordOne, passwordTwo } = req.body;

  let passwordError, passwordErrorMessage, passwordOneError, passwordTwoError;

  req.session.password = passwordOne;

  let hasUpperCase = /[A-Z]/.test(passwordOne);
  let hasLowerCase = /[a-z]/.test(passwordOne);
  let hasNumbers = /\d/.test(passwordOne);
  // let hasNonalphas = /\W/.test(passwordOne);

  if (passwordOne.length < 8) {
    passwordError = true;
    passwordOneError = true;
    passwordErrorMessage = '<li>Your password is too short</li>';
  } else if (hasUpperCase + hasLowerCase + hasNumbers < 3) {
    passwordError = true;
    passwordOneError = true;
    passwordErrorMessage = '<li>Your password is not complex enough</li>';
  } else if (passwordOne !== passwordTwo) {
    passwordError = true;
    passwordTwoError = true;
    passwordErrorMessage = '<li>Your passwords do not match</li>';
  }

  if (passwordError === true) {
    req.session.passwordError = passwordError;
    req.session.passwordOneError = passwordOneError;
    req.session.passwordTwoError = passwordTwoError;
    req.session.passwordErrorMessage = passwordErrorMessage;
    return res.redirect('/prototypes/learner/v1/registration/password');
  } else {
    req.session.passwordError = req.session.passwordOneError = req.session.passwordTwoError = req.session.passwordErrorMessage = null;
    return res.redirect('/prototypes/learner/v1/registration/review');
  }
}

// **************************************************************************************
// Review GET
// **************************************************************************************
function registerReviewGet(req, res) {
  let viewData, email, firstName, lastName, departmentName, professionName, gradeName, password;

  email = req.session.email;
  firstName = req.session.firstName;
  lastName = req.session.lastName;
  departmentName = req.session.departmentName;
  professionName = req.session.professionName;
  gradeName = req.session.gradeName;
  password = req.session.password;

  viewData = {
    email,
    firstName,
    lastName,
    departmentName,
    professionName,
    gradeName,
    password
  };

  return res.render('prototypes/learner/v1/registration/review/index', viewData);
}

// Review: POST
function registerReviewPost(req, res) {
  const { email, email2 } = req.body;

  let signinError;

  // no validation required, just save to session and send on to complete
  return res.redirect('/prototypes/learner/v1/registration/complete');
}
// **************************************************************************************
// Complete GET
// **************************************************************************************
function registerCompleteGet(req, res) {
  let viewData;

  return res.render('prototypes/learner/v1/registration/complete/index', viewData);
}