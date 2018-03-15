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

var _suspendTesters = require('./../controllers/annual-assessment-tool/suspend-testers');

var suspendTestersController = _interopRequireWildcard(_suspendTesters);

var _motTest = require('./../controllers/mot-test/mot-test');

var motTestResultsController = _interopRequireWildcard(_motTest);

var _ajaxBrowse = require('./../controllers/ajax-browse');

var ajaxBrowseController = _interopRequireWildcard(_ajaxBrowse);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

const router = (0, _express.Router)();

// Misc routes
router.get('/robots.txt', mainController.robots);
router.get('/', mainController.index);

// API Routes
router.post('/api/v1/recalls', recallsController.recalls);
// router.post('/api/v1/ajax-browse', ajaxBrowseAPIController.getItems);

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

// Annual Assessment tool - suspend testers path
router.get('/prototypes/annual-assessment-admin-tool/suspend-testers', suspendTestersController.getSuspendTesters);
router.post('/prototypes/annual-assessment-admin-tool/suspend-testers', suspendTestersController.postSuspendTesters);

// MOT test - add tester comments
router.get('/prototypes/mot-test', motTestResultsController.getMOTResults);
router.get('/prototypes/mot-test/comment', motTestResultsController.getAddTesterComment);
router.post('/prototypes/mot-test/comment', motTestResultsController.postAddTesterComment);
router.get('/prototypes/mot-test/comment/edit', motTestResultsController.getEditTesterComment);
router.post('/prototypes/mot-test/comment/edit', motTestResultsController.postEditTesterComment);
router.post('/prototypes/mot-test/comment/remove/', motTestResultsController.destorySession);
router.get('/prototypes/mot-test/review', motTestResultsController.getReview);

// Ajax browse
router.get('/prototypes/ajax-browse', ajaxBrowseController.getAjaxBrowse);
router.post('/prototypes/ajax-browse', ajaxBrowseController.postAjaxBrowse);

// Create route from view path
router.get('*', miscController.viewFileRoute);

const allRoutes = exports.allRoutes = router;