"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.allRoutes = void 0;
var _express = require("express");
var mainController = _interopRequireWildcard(require("../controllers/main.controller"));
var miscController = _interopRequireWildcard(require("../controllers/misc.controller"));
var recallsController = _interopRequireWildcard(require("../controllers/api/v1/recalls.controller"));
var createAccountController = _interopRequireWildcard(require("../controllers/create-account"));
var compareTestsController = _interopRequireWildcard(require("../controllers/compare-tests/compare-tests"));
var suspendTestersController = _interopRequireWildcard(require("../controllers/annual-assessment-tool/suspend-testers"));
var motTestResultsController = _interopRequireWildcard(require("../controllers/mot-test/mot-test"));
var speechToTextController = _interopRequireWildcard(require("../controllers/speech-to-text-search/speech-to-text-search"));
var siteReviewController = _interopRequireWildcard(require("../controllers/site-review/site-review"));
var brakeTestController = _interopRequireWildcard(require("../controllers/brake-test/brake-test"));
var messagingController = _interopRequireWildcard(require("../controllers/mts-messages"));
var vtsChangeController = _interopRequireWildcard(require("../controllers/vts-changes"));
var vsiDuringTestController = _interopRequireWildcard(require("../controllers/vsi-during-test"));
var mothData = _interopRequireWildcard(require("../controllers/mot-history-data"));
var recalls = _interopRequireWildcard(require("../controllers/recalls"));
var mothController = _interopRequireWildcard(require("../controllers/moth"));
var PrototypeAuth = _interopRequireWildcard(require("../middlewares/authentication"));
var _constants = require("../config/constants");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var router = (0, _express.Router)();

/* Mount Authorisation to all prototype paths when in Prod.
   Requires credentials to match those in in Heroku env settings
*/
if (!(0, _constants.isDevelopment)()) {
  router.get('/prototypes*', PrototypeAuth.authenticationMiddleware);
}

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

// Speech to text - add defect path
router.get('/prototypes/speech-to-text/', speechToTextController.getSearchQuery);
router.post('/prototypes/speech-to-text/categories/', speechToTextController.postSearchQuery);
router.post('/prototypes/speech-to-text/add-major-failure/', speechToTextController.captureFormValues);
router.get('/prototypes/speech-to-text/remove-defect', speechToTextController.removeDefect);

// Site review paths
router.get('/prototypes/site-review/', siteReviewController.clearReviewSession);
router.get('/prototypes/site-review/choose-section', siteReviewController.getChooseSection);
router.get('/prototypes/site-review/assessment/activity', siteReviewController.getAssessment);
router.get('/prototypes/site-review/assessment/compliance', siteReviewController.getAssessment);
router.get('/prototypes/site-review/assessment/management-and-quality', siteReviewController.getAssessment);
router.get('/prototypes/site-review/assessment/people', siteReviewController.getAssessment);
router.get('/prototypes/site-review/assessment/premises', siteReviewController.getAssessment);
router.get('/prototypes/site-review/summary', siteReviewController.getSummary);
router.get('/prototypes/site-review/enter-details', siteReviewController.getDetails);
router.post('/prototypes/site-review/assessment/activity', [siteReviewController.validateActivity, siteReviewController.populateActivity, siteReviewController.postAssessment]);
router.post('/prototypes/site-review/assessment/compliance', [siteReviewController.unpopulateAssessmentType, siteReviewController.validateAssessmentPost, siteReviewController.postAssessment]);
router.post('/prototypes/site-review/assessment/management-and-quality', [siteReviewController.unpopulateAssessmentType, siteReviewController.validateAssessmentPost, siteReviewController.postAssessment]);
router.post('/prototypes/site-review/assessment/people', [siteReviewController.unpopulateAssessmentType, siteReviewController.validateAssessmentPost, siteReviewController.postAssessment]);
router.post('/prototypes/site-review/assessment/premises', [siteReviewController.unpopulateAssessmentType, siteReviewController.validateAssessmentPost, siteReviewController.postAssessment]);
router.post('/prototypes/site-review/enter-details', [siteReviewController.validateDetails, siteReviewController.postDetails]);
router.post('/prototypes/site-review/v5/assessment-activity', siteReviewController.branchOnActivity);

// Brake tests
router.post('/prototypes/brake-test-config', brakeTestController.postBrakeConfig);
router.post('/prototypes/brake-test-entry', brakeTestController.postBrakeEntry);

// MTS Messaging
router.param('messageIndex', messagingController.isValidMessage);
router.get('/prototypes/messages/homepage', [messagingController.setupMessages, messagingController.setNotificationCounts, messagingController.getHomepage]);
router.get('/prototypes/messages/archive', messagingController.getArchive);
router.get('/prototypes/messages/inbox', messagingController.getMessages);
router.get('/prototypes/messages/:messageIndex', messagingController.getMessage);
router.get('/prototypes/messages/acknowledge/:messageIndex', [messagingController.unpinSpecialNotice, messagingController.acknowledgeMessage]);
router.get('/prototypes/messages/accept/:messageIndex', messagingController.acceptMessage);
router.get('/prototypes/messages/reject/:messageIndex', messagingController.rejectMessage);
router.get('/prototypes/messages/archive/:messageIndex', messagingController.archiveMessage);
router.get('/prototypes/mts-messages', messagingController.resetMessages);

// VTS changes

router.get('/prototypes/vts-changes/', vtsChangeController.resetSession);
router.get('/prototypes/vts-changes/home', vtsChangeController.startJourney);
router.get('/prototypes/vts-changes/start', vtsChangeController.getStart);
router.get('/prototypes/vts-changes/type', vtsChangeController.getStage);
router.post('/prototypes/vts-changes/type', [vtsChangeController.validateType, vtsChangeController.postType]);
router.get('/prototypes/vts-changes/approved', vtsChangeController.getStage);
router.post('/prototypes/vts-changes/approved', [vtsChangeController.validateStage, vtsChangeController.postStage]);
router.post('/prototypes/vts-changes/layout', [vtsChangeController.validateStage, vtsChangeController.postStage]);
router.get('/prototypes/vts-changes/layout', vtsChangeController.getStage);
router.get('/prototypes/vts-changes/classes', vtsChangeController.getStage);
router.post('/prototypes/vts-changes/classes', [vtsChangeController.validateStage, vtsChangeController.postStage]);
router.get('/prototypes/vts-changes/summary', vtsChangeController.getStage);
router.get('/prototypes/vts-changes/short-summary', vtsChangeController.getStage);

// Recalls
router.post('/prototypes/recalls/V1/type-of-recall', [recalls.validateType, recalls.postRecallType]);

// VSI during test
router.get('/prototypes/vsi-during-test/inspection/inspection-2', vsiDuringTestController.getInspection2);
router.get('/prototypes/vsi-during-test/inspection/inspection-3', vsiDuringTestController.getInspection3);
router.get('/prototypes/vsi-during-test/inspection/inspection-4', vsiDuringTestController.getInspection4);
router.get('/prototypes/vsi-during-test/inspection/inspection-5', vsiDuringTestController.getInspection5);
router.get('/prototypes/vsi-during-test/summary', vsiDuringTestController.getSummary);
router.get('/prototypes/vsi-during-test/inspection', [vsiDuringTestController.initViewData, vsiDuringTestController.getInspection1]);
router.get('/prototypes/vsi-during-test/advice', [vsiDuringTestController.getPrevUrl, vsiDuringTestController.getAdvice]);
router.get('/prototypes/vsi-during-test/odometer', [vsiDuringTestController.getPrevUrl, vsiDuringTestController.getOdometer]);
router.post('/prototypes/vsi-during-test/odometer', vsiDuringTestController.postOdometer);

// MOTH Data
router.post('/prototypes/mot-history-data/:version/enter-v5c', [mothData.checkV5c, mothData.postV5c]);
router.get('/prototypes/mot-history-data/:version/history-results-audi', mothData.initViewData);
router.get('/prototypes/mot-history-data/:version/enter-v5c', mothData.initViewData);
router.get('/prototypes/mot-history-data/:version/enter-v5c-fail', mothData.initViewData);
router.get('/prototypes/mot-history-data/:version/enter-v5c-error', mothData.getError);
router.get('/prototypes/mot-history-data/cvs-v3/history-results-audi-error1', mothData.getError);
router.get('/prototypes/mot-history-data/cvs-v3/history-results-audi-error2', mothData.getError);

// Compare tests
router.get('/prototypes/compare-tests/v8/start', compareTestsController.getStart);
router.get('/prototypes/compare-tests/v8/overview', compareTestsController.getOverview);
router.get('/prototypes/compare-tests/v8/record-outcome', compareTestsController.getRecordOutcome);
router.get('/prototypes/compare-tests/v8/assess-difference/:defectIndex', compareTestsController.getDifference);
router.get('/prototypes/compare-tests/v8/shortcomings', compareTestsController.getShortcomings);
router.get('/prototypes/compare-tests/v8/summary', compareTestsController.getSummary);
router.post('/prototypes/compare-tests/v8/assess-difference/:defectIndex', [compareTestsController.checkCompletion, compareTestsController.postDifference]);
router.post('/prototypes/compare-tests/v8/record-outcome', compareTestsController.postRecordOutcome);
router.post('/prototypes/compare-tests/v8/shortcomings', compareTestsController.postShortcomings);

// Create route from view path
router.get('*', miscController.viewFileRoute);

// MOT history vehicle type
router.post('/prototypes/mot-history-data/cvs/what-vehicle', mothController.postMothType);
var allRoutes = exports.allRoutes = router;