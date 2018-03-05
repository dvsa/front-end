'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.allRoutes = undefined;

var _express = require('express');

var _main = require('./../controllers/main.controller');

var mainController = _interopRequireWildcard(_main);

var _misc = require('./../controllers/misc.controller');

var miscController = _interopRequireWildcard(_misc);

var _recalls = require('./../controllers/api/v1/recalls.controller');

var recallsController = _interopRequireWildcard(_recalls);

var _createAccount = require('./../controllers/create-account');

var createAccountController = _interopRequireWildcard(_createAccount);

var _learnerV = require('./../controllers/learnerV1');

var learnerV1Controller = _interopRequireWildcard(_learnerV);

var _learnerV2 = require('./../controllers/learnerV2');

var learnerV2Controller = _interopRequireWildcard(_learnerV2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

const router = (0, _express.Router)();

// Misc routes
router.get('/robots.txt', mainController.robots);
router.get('/', mainController.index);

// API Routes
router.post('/api/v1/recalls', recallsController.recalls);

// Create account user journey
router.get('/prototypes/create-account', createAccountController.getRoot);
router.get('/prototypes/create-account/email', createAccountController.getEmail);
router.get('/prototypes/create-account/details', createAccountController.getDetails);
router.get('/prototypes/create-account/contact-details', createAccountController.getContactDetails);
router.get('/prototypes/create-account/security-questions', createAccountController.getSecurityQuestions);
router.get('/prototypes/create-account/password', createAccountController.getPassword);
router.get('/prototypes/create-account/review', createAccountController.getReview);
router.post('/prototypes/create-account/email', createAccountController.emailValidationChecks, createAccountController.postEmail);
router.post('/prototypes/create-account/details', createAccountController.detailsValidationChecks, createAccountController.postDetails);
router.post('/prototypes/create-account/contact-details', createAccountController.contactDetailsValidationChecks, createAccountController.postContactDetails);
router.post('/prototypes/create-account/security-questions', createAccountController.securityQuestions, createAccountController.postSecurityQuestions);
router.post('/prototypes/create-account/password', createAccountController.passwordValidationChecks, createAccountController.postPassword);

//******************************************************
//
//      v1 end-to-end learner journey custom routes
//
//******************************************************

// import { routesLearnerV1 } from './routesLearnerV1';
// learner config
router.get('/prototypes/learner/v1/config', learnerV1Controller.configGet);
router.post('/prototypes/learner/v1/config', learnerV1Controller.configPost);

//******************************************************
//      Various smaller sections
//******************************************************
// start
router.get('/prototypes/learner/v1', learnerV1Controller.indexGet);
router.post('/prototypes/learner/v1', learnerV1Controller.indexPost);
// home
router.get('/prototypes/learner/v1/home', learnerV1Controller.homeGet);
// router.post('/prototypes/learner/v1/home', learnerV1Controller.homePost);

// profile
router.get('/prototypes/learner/v1/your-profile', learnerV1Controller.profileGet);
// planned learning
router.get('/prototypes/learner/v1/learning-plan', learnerV1Controller.plannedGet);
// learning record
router.get('/prototypes/learner/v1/learning-record', learnerV1Controller.recordGet);
// suggested learning
router.get('/prototypes/learner/v1/suggested-learning', learnerV1Controller.suggestedGet);

// search
router.get('/prototypes/learner/v1/search', learnerV1Controller.searchGet);
router.post('/prototypes/learner/v1/search', learnerV1Controller.searchPost);

// feedback
router.get('/prototypes/learner/v1/feedback', learnerV1Controller.feedbackGet);

// Actions
router.get('/prototypes/learner/v1/actions', learnerV1Controller.actionsGet);
router.post('/prototypes/learner/v1/actions', learnerV1Controller.actionsPost);

//******************************************************
//      Registration stuff
//******************************************************
// registration, email
router.get('/prototypes/learner/v1/registration', learnerV1Controller.registerEmailGet);
router.post('/prototypes/learner/v1/registration', learnerV1Controller.registerEmailPost);
// registration, name
router.get('/prototypes/learner/v1/registration/personal-details', learnerV1Controller.registerPersonalGet);
router.post('/prototypes/learner/v1/registration/personal-details', learnerV1Controller.registerPersonalPost);

// registration, job, part 1, department
router.get('/prototypes/learner/v1/registration/department', learnerV1Controller.registerDepartmentGet);
router.post('/prototypes/learner/v1/registration/department', learnerV1Controller.registerDepartmentPost);
// registration, job, part 2, profession
router.get('/prototypes/learner/v1/registration/area-of-work', learnerV1Controller.registerAreaGet);
router.post('/prototypes/learner/v1/registration/area-of-work', learnerV1Controller.registerAreaPost);
// registration, job, part 3, grade
router.get('/prototypes/learner/v1/registration/grade', learnerV1Controller.registerGradeGet);
router.post('/prototypes/learner/v1/registration/grade', learnerV1Controller.registerGradePost);

// registration, password
router.get('/prototypes/learner/v1/registration/password', learnerV1Controller.registerPasswordGet);
router.post('/prototypes/learner/v1/registration/password', learnerV1Controller.registerPasswordPost);
// registration, review
router.get('/prototypes/learner/v1/registration/review', learnerV1Controller.registerReviewGet);
router.post('/prototypes/learner/v1/registration/review', learnerV1Controller.registerReviewPost);
// registration, complete
router.get('/prototypes/learner/v1/registration/complete', learnerV1Controller.registerCompleteGet);
// router.post('/prototypes/learner/v1/registration/complete', learnerV1Controller.registerCompletePost);

// registration, complete
router.get('/prototypes/learner/v1/resource', learnerV1Controller.resourceGet);

//******************************************************
//      Booking stuff
//******************************************************
router.get('/prototypes/learner/v1/booking', learnerV1Controller.bookingDateGet);
router.post('/prototypes/learner/v1/booking', learnerV1Controller.bookingDatePost);
router.get('/prototypes/learner/v1/booking/payment', learnerV1Controller.bookingPaymentGet);
router.post('/prototypes/learner/v1/booking/payment', learnerV1Controller.bookingPaymentPost);
router.get('/prototypes/learner/v1/booking/confirm', learnerV1Controller.bookingConfirmGet);
router.get('/prototypes/learner/v1/booking/complete', learnerV1Controller.bookingCompleteGet);

//******************************************************
//
//      v2 end-to-end learner journey custom routes
//
//******************************************************
// learner config
router.get('/prototypes/learner/v2/config', learnerV2Controller.configGet);
router.post('/prototypes/learner/v2/config', learnerV2Controller.configPost);

//******************************************************
//      Various smaller sections
//******************************************************
// start
router.get('/prototypes/learner/v2', learnerV2Controller.indexGet);
router.post('/prototypes/learner/v2', learnerV2Controller.indexPost);
// home
router.get('/prototypes/learner/v2/home', learnerV2Controller.homeGet);
// router.post('/prototypes/learner/v2/home', learnerV2Controller.homePost);

// profile
router.get('/prototypes/learner/v2/your-profile', learnerV2Controller.profileGet);
// planned learning
router.get('/prototypes/learner/v2/learning-plan', learnerV2Controller.plannedGet);
// learning record
router.get('/prototypes/learner/v2/learning-record', learnerV2Controller.recordGet);
// suggested learning
router.get('/prototypes/learner/v2/suggested-learning', learnerV2Controller.suggestedGet);

// search
router.get('/prototypes/learner/v2/search', learnerV2Controller.searchGet);
router.post('/prototypes/learner/v2/search', learnerV2Controller.searchPost);

// feedback
router.get('/prototypes/learner/v2/feedback', learnerV2Controller.feedbackGet);

// Actions
router.get('/prototypes/learner/v2/actions', learnerV2Controller.actionsGet);
router.post('/prototypes/learner/v2/actions', learnerV2Controller.actionsPost);

//******************************************************
//      Registration stuff
//******************************************************
// registration, email
router.get('/prototypes/learner/v2/registration', learnerV2Controller.registerEmailGet);
router.post('/prototypes/learner/v2/registration', learnerV2Controller.registerEmailPost);
// registration, name
router.get('/prototypes/learner/v2/registration/personal-details', learnerV2Controller.registerPersonalGet);
router.post('/prototypes/learner/v2/registration/personal-details', learnerV2Controller.registerPersonalPost);

// registration, job, part 1, department
router.get('/prototypes/learner/v2/registration/department', learnerV2Controller.registerDepartmentGet);
router.post('/prototypes/learner/v2/registration/department', learnerV2Controller.registerDepartmentPost);
// registration, job, part 2, profession
router.get('/prototypes/learner/v2/registration/area-of-work', learnerV2Controller.registerAreaGet);
router.post('/prototypes/learner/v2/registration/area-of-work', learnerV2Controller.registerAreaPost);
// registration, job, part 3, grade
router.get('/prototypes/learner/v2/registration/grade', learnerV2Controller.registerGradeGet);
router.post('/prototypes/learner/v2/registration/grade', learnerV2Controller.registerGradePost);

// registration, password
router.get('/prototypes/learner/v2/registration/password', learnerV2Controller.registerPasswordGet);
router.post('/prototypes/learner/v2/registration/password', learnerV2Controller.registerPasswordPost);
// registration, review
router.get('/prototypes/learner/v2/registration/review', learnerV2Controller.registerReviewGet);
router.post('/prototypes/learner/v2/registration/review', learnerV2Controller.registerReviewPost);
// registration, complete
router.get('/prototypes/learner/v2/registration/complete', learnerV2Controller.registerCompleteGet);
// router.post('/prototypes/learner/v2/registration/complete', learnerV2Controller.registerCompletePost);

// registration, complete
router.get('/prototypes/learner/v2/resource', learnerV2Controller.resourceGet);

//******************************************************
//      Booking stuff
//******************************************************
router.get('/prototypes/learner/v2/booking', learnerV2Controller.bookingDateGet);
router.post('/prototypes/learner/v2/booking', learnerV2Controller.bookingDatePost);
router.get('/prototypes/learner/v2/booking/payment', learnerV2Controller.bookingPaymentGet);
router.post('/prototypes/learner/v2/booking/payment', learnerV2Controller.bookingPaymentPost);
router.get('/prototypes/learner/v2/booking/confirm', learnerV2Controller.bookingConfirmGet);
router.get('/prototypes/learner/v2/booking/complete', learnerV2Controller.bookingCompleteGet);

// Create route from view path
router.get('*', miscController.viewFileRoute);

const allRoutes = exports.allRoutes = router;