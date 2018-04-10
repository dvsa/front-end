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

var _learnerV3 = require('./../controllers/learnerV3');

var learnerV3Controller = _interopRequireWildcard(_learnerV3);

var _learnerV4 = require('./../controllers/learnerV4');

var learnerV4Controller = _interopRequireWildcard(_learnerV4);

var _learnerV5 = require('./../controllers/learnerV5');

var learnerV5Controller = _interopRequireWildcard(_learnerV5);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// import

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

//******************************************************
//
//      v3 end-to-end learner journey custom routes
//
//******************************************************
// learner config

router.get('/prototypes/learner/v3/config', learnerV3Controller.configGet);
router.post('/prototypes/learner/v3/config', learnerV3Controller.configPost);

//******************************************************
//      Various smaller sections
//******************************************************
// start
router.get('/prototypes/learner/v3', learnerV3Controller.indexGet);
router.post('/prototypes/learner/v3', learnerV3Controller.indexPost);
// home
router.get('/prototypes/learner/v3/home', learnerV3Controller.homeGet);
// router.post('/prototypes/learner/v3/home', learnerV3Controller.homePost);

// profile
router.get('/prototypes/learner/v3/your-profile', learnerV3Controller.profileGet);
// planned learning
router.get('/prototypes/learner/v3/learning-plan', learnerV3Controller.plannedGet);
// learning record
router.get('/prototypes/learner/v3/learning-record', learnerV3Controller.recordGet);
// suggested learning
router.get('/prototypes/learner/v3/suggested-learning', learnerV3Controller.suggestedGet);

// search
router.get('/prototypes/learner/v3/search', learnerV3Controller.searchGet);
router.post('/prototypes/learner/v3/search', learnerV3Controller.searchPost);

// feedback
router.get('/prototypes/learner/v3/feedback', learnerV3Controller.feedbackGet);

// Actions
router.get('/prototypes/learner/v3/actions', learnerV3Controller.actionsGet);
router.post('/prototypes/learner/v3/actions', learnerV3Controller.actionsPost);

//******************************************************
//      Registration stuff
//******************************************************
// registration, email
router.get('/prototypes/learner/v3/registration', learnerV3Controller.registerEmailGet);
router.post('/prototypes/learner/v3/registration', learnerV3Controller.registerEmailPost);
// registration, name
router.get('/prototypes/learner/v3/registration/personal-details', learnerV3Controller.registerPersonalGet);
router.post('/prototypes/learner/v3/registration/personal-details', learnerV3Controller.registerPersonalPost);

// registration, job, part 1, department
router.get('/prototypes/learner/v3/registration/department', learnerV3Controller.registerDepartmentGet);
router.post('/prototypes/learner/v3/registration/department', learnerV3Controller.registerDepartmentPost);
// registration, job, part 2, profession
router.get('/prototypes/learner/v3/registration/area-of-work', learnerV3Controller.registerAreaGet);
router.post('/prototypes/learner/v3/registration/area-of-work', learnerV3Controller.registerAreaPost);
// registration, job, part 3, grade
router.get('/prototypes/learner/v3/registration/grade', learnerV3Controller.registerGradeGet);
router.post('/prototypes/learner/v3/registration/grade', learnerV3Controller.registerGradePost);

// registration, password
router.get('/prototypes/learner/v3/registration/password', learnerV3Controller.registerPasswordGet);
router.post('/prototypes/learner/v3/registration/password', learnerV3Controller.registerPasswordPost);
// registration, review
router.get('/prototypes/learner/v3/registration/review', learnerV3Controller.registerReviewGet);
router.post('/prototypes/learner/v3/registration/review', learnerV3Controller.registerReviewPost);
// registration, complete
router.get('/prototypes/learner/v3/registration/complete', learnerV3Controller.registerCompleteGet);
// router.post('/prototypes/learner/v3/registration/complete', learnerV3Controller.registerCompletePost);

// registration, complete
router.get('/prototypes/learner/v3/resource', learnerV3Controller.resourceGet);
router.post('/prototypes/learner/v3/resource', learnerV3Controller.resourcePost);

//******************************************************
//      Booking stuff
//******************************************************
router.get('/prototypes/learner/v3/booking', learnerV3Controller.bookingDateGet);
router.post('/prototypes/learner/v3/booking', learnerV3Controller.bookingDatePost);
router.get('/prototypes/learner/v3/booking/payment', learnerV3Controller.bookingPaymentGet);
router.post('/prototypes/learner/v3/booking/payment', learnerV3Controller.bookingPaymentPost);
router.get('/prototypes/learner/v3/booking/confirm', learnerV3Controller.bookingConfirmGet);
router.get('/prototypes/learner/v3/booking/complete', learnerV3Controller.bookingCompleteGet);

// SCORMS fire safety
router.get('/prototypes/learner/v3/scorms/basic-fire-safety', learnerV3Controller.basicFireSafetyGet);
router.post('/prototypes/learner/v3/scorms/basic-fire-safety', learnerV3Controller.basicFireSafetyPost);
// scorm done
router.get('/prototypes/learner/v3/scorms/basic-fire-safety/complete', learnerV3Controller.scormCompleteGet);

//******************************************************
//
//      v4 end-to-end learner journey custom routes
//
//******************************************************
// learner config

router.get('/prototypes/learner/v4/config', learnerV4Controller.configGet);
router.post('/prototypes/learner/v4/config', learnerV4Controller.configPost);

//******************************************************
//      Various smaller sections
//******************************************************
// start
router.get('/prototypes/learner/v4', learnerV4Controller.indexGet);
router.post('/prototypes/learner/v4', learnerV4Controller.indexPost);
// home
router.get('/prototypes/learner/v4/home', learnerV4Controller.homeGet);
// router.post('/prototypes/learner/v4/home', learnerV4Controller.homePost);

// profile
router.get('/prototypes/learner/v4/your-profile', learnerV4Controller.profileGet);
// planned learning
router.get('/prototypes/learner/v4/learning-plan', learnerV4Controller.plannedGet);
// learning record
router.get('/prototypes/learner/v4/learning-record', learnerV4Controller.recordGet);
// suggested learning
router.get('/prototypes/learner/v4/suggested-learning', learnerV4Controller.suggestedGet);

// search
router.get('/prototypes/learner/v4/search', learnerV4Controller.searchGet);
router.post('/prototypes/learner/v4/search', learnerV4Controller.searchPost);

// feedback
router.get('/prototypes/learner/v4/feedback', learnerV4Controller.feedbackGet);
router.post('/prototypes/learner/v4/feedback', learnerV4Controller.feedbackPost);

// Actions
router.get('/prototypes/learner/v4/actions', learnerV4Controller.actionsGet);
router.post('/prototypes/learner/v4/actions', learnerV4Controller.actionsPost);

//******************************************************
//      Registration stuff
//******************************************************
// registration, email
router.get('/prototypes/learner/v4/registration', learnerV4Controller.registerEmailGet);
router.post('/prototypes/learner/v4/registration', learnerV4Controller.registerEmailPost);
// registration, name
router.get('/prototypes/learner/v4/registration/personal-details', learnerV4Controller.registerPersonalGet);
router.post('/prototypes/learner/v4/registration/personal-details', learnerV4Controller.registerPersonalPost);

// registration, job, part 1, department
router.get('/prototypes/learner/v4/registration/department', learnerV4Controller.registerDepartmentGet);
router.post('/prototypes/learner/v4/registration/department', learnerV4Controller.registerDepartmentPost);
// registration, job, part 2, profession
router.get('/prototypes/learner/v4/registration/area-of-work', learnerV4Controller.registerAreaGet);
router.post('/prototypes/learner/v4/registration/area-of-work', learnerV4Controller.registerAreaPost);
// registration, job, part 3, grade
router.get('/prototypes/learner/v4/registration/grade', learnerV4Controller.registerGradeGet);
router.post('/prototypes/learner/v4/registration/grade', learnerV4Controller.registerGradePost);

// registration, password
router.get('/prototypes/learner/v4/registration/password', learnerV4Controller.registerPasswordGet);
router.post('/prototypes/learner/v4/registration/password', learnerV4Controller.registerPasswordPost);
// registration, review
router.get('/prototypes/learner/v4/registration/review', learnerV4Controller.registerReviewGet);
router.post('/prototypes/learner/v4/registration/review', learnerV4Controller.registerReviewPost);
// registration, complete
router.get('/prototypes/learner/v4/registration/complete', learnerV4Controller.registerCompleteGet);
// router.post('/prototypes/learner/v4/registration/complete', learnerV4Controller.registerCompletePost);

// registration, complete
router.get('/prototypes/learner/v4/resource', learnerV4Controller.resourceGet);
router.post('/prototypes/learner/v4/resource', learnerV4Controller.resourcePost);

//******************************************************
//      Booking stuff
//******************************************************
router.get('/prototypes/learner/v4/booking', learnerV4Controller.bookingDateGet);
router.post('/prototypes/learner/v4/booking', learnerV4Controller.bookingDatePost);
router.get('/prototypes/learner/v4/booking/payment', learnerV4Controller.bookingPaymentGet);
router.post('/prototypes/learner/v4/booking/payment', learnerV4Controller.bookingPaymentPost);
router.get('/prototypes/learner/v4/booking/confirm', learnerV4Controller.bookingConfirmGet);
router.get('/prototypes/learner/v4/booking/complete', learnerV4Controller.bookingCompleteGet);

// SCORMS fire safety
router.get('/prototypes/learner/v4/scorms/basic-fire-safety', learnerV4Controller.basicFireSafetyGet);
router.post('/prototypes/learner/v4/scorms/basic-fire-safety', learnerV4Controller.basicFireSafetyPost);
// scorm done
router.get('/prototypes/learner/v4/scorms/basic-fire-safety/complete', learnerV4Controller.scormCompleteGet);

//******************************************************
//
//      v5 end-to-end learner journey custom routes
//
//******************************************************
// learner config

router.get('/prototypes/learner/v5/config', learnerV5Controller.configGet);
router.post('/prototypes/learner/v5/config', learnerV5Controller.configPost);

//******************************************************
//      Various smaller sections
//******************************************************
// start
router.get('/prototypes/learner/v5', learnerV5Controller.indexGet);
router.post('/prototypes/learner/v5', learnerV5Controller.indexPost);
// home
router.get('/prototypes/learner/v5/home', learnerV5Controller.homeGet);
// router.post('/prototypes/learner/v5/home', learnerV5Controller.homePost);

// profile
router.get('/prototypes/learner/v5/your-profile', learnerV5Controller.profileGet);
// planned learning
router.get('/prototypes/learner/v5/learning-plan', learnerV5Controller.plannedGet);
// learning record
router.get('/prototypes/learner/v5/learning-record', learnerV5Controller.recordGet);
// suggested learning
router.get('/prototypes/learner/v5/suggested-learning', learnerV5Controller.suggestedGet);

// search
router.get('/prototypes/learner/v5/search', learnerV5Controller.searchGet);
router.post('/prototypes/learner/v5/search', learnerV5Controller.searchPost);

// feedback
router.get('/prototypes/learner/v5/feedback', learnerV5Controller.feedbackGet);
router.post('/prototypes/learner/v5/feedback', learnerV5Controller.feedbackPost);

// Actions
router.get('/prototypes/learner/v5/actions', learnerV5Controller.actionsGet);
router.post('/prototypes/learner/v5/actions', learnerV5Controller.actionsPost);

//******************************************************
//      Registration stuff
//******************************************************
// registration, email
router.get('/prototypes/learner/v5/registration', learnerV5Controller.registerEmailGet);
router.post('/prototypes/learner/v5/registration', learnerV5Controller.registerEmailPost);
// registration, name
router.get('/prototypes/learner/v5/registration/personal-details', learnerV5Controller.registerPersonalGet);
router.post('/prototypes/learner/v5/registration/personal-details', learnerV5Controller.registerPersonalPost);

// registration, job, part 1, department
router.get('/prototypes/learner/v5/registration/department', learnerV5Controller.registerDepartmentGet);
router.post('/prototypes/learner/v5/registration/department', learnerV5Controller.registerDepartmentPost);
// registration, job, part 2, profession
router.get('/prototypes/learner/v5/registration/area-of-work', learnerV5Controller.registerAreaGet);
router.post('/prototypes/learner/v5/registration/area-of-work', learnerV5Controller.registerAreaPost);
// registration, job, part 3, grade
router.get('/prototypes/learner/v5/registration/grade', learnerV5Controller.registerGradeGet);
router.post('/prototypes/learner/v5/registration/grade', learnerV5Controller.registerGradePost);

// registration, password
router.get('/prototypes/learner/v5/registration/password', learnerV5Controller.registerPasswordGet);
router.post('/prototypes/learner/v5/registration/password', learnerV5Controller.registerPasswordPost);
// registration, review
router.get('/prototypes/learner/v5/registration/review', learnerV5Controller.registerReviewGet);
router.post('/prototypes/learner/v5/registration/review', learnerV5Controller.registerReviewPost);
// registration, complete
router.get('/prototypes/learner/v5/registration/complete', learnerV5Controller.registerCompleteGet);
// router.post('/prototypes/learner/v5/registration/complete', learnerV5Controller.registerCompletePost);

// registration, complete
router.get('/prototypes/learner/v5/resource', learnerV5Controller.resourceGet);
router.post('/prototypes/learner/v5/resource', learnerV5Controller.resourcePost);

//******************************************************
//      Booking stuff
//******************************************************
router.get('/prototypes/learner/v5/booking', learnerV5Controller.bookingDateGet);
router.post('/prototypes/learner/v5/booking', learnerV5Controller.bookingDatePost);
router.get('/prototypes/learner/v5/booking/payment', learnerV5Controller.bookingPaymentGet);
router.post('/prototypes/learner/v5/booking/payment', learnerV5Controller.bookingPaymentPost);
router.get('/prototypes/learner/v5/booking/confirm', learnerV5Controller.bookingConfirmGet);
router.get('/prototypes/learner/v5/booking/complete', learnerV5Controller.bookingCompleteGet);

// SCORMS fire safety
router.get('/prototypes/learner/v5/scorms/basic-fire-safety', learnerV5Controller.basicFireSafetyGet);
router.post('/prototypes/learner/v5/scorms/basic-fire-safety', learnerV5Controller.basicFireSafetyPost);
// scorm done
router.get('/prototypes/learner/v5/scorms/basic-fire-safety/complete', learnerV5Controller.scormCompleteGet);

// Create route from view path
router.get('*', miscController.viewFileRoute);

const allRoutes = exports.allRoutes = router;