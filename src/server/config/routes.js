import { Router } from 'express';

import * as mainController from '../controllers/main.controller';
import * as miscController from '../controllers/misc.controller';
import * as recallsController from '../controllers/api/v1/recalls.controller';
import * as createAccountController from '../controllers/create-account';
import * as compareTestsController from '../controllers/compare-tests/compare-tests';
import * as suspendTestersController from '../controllers/annual-assessment-tool/suspend-testers';
import * as motTestResultsController from '../controllers/mot-test/mot-test';
import * as speechToTextController from '../controllers/speech-to-text-search/speech-to-text-search';
import * as siteReviewController from '../controllers/site-review/site-review';
import * as brakeTestController from '../controllers/brake-test/brake-test';
import * as messagingController from '../controllers/mts-messages';
import * as vtsChangeController from '../controllers/vts-changes';
import * as vsiDuringTestController from '../controllers/vsi-during-test';
import * as recalls from '../controllers/recalls';
import * as mothController from '../controllers/moth';
import * as PrototypeAuth from '../middlewares/authentication';
import { isDevelopment } from '../config/constants';

const router = Router();

/* Mount Authorisation to all prototype paths when in Prod.
   Requires credentials to match those in in Heroku env settings
*/
if (!isDevelopment()) {
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
router.post(
  '/prototypes/create-account/contact-details',
  createAccountController.contactDetailsValidationChecks,
  createAccountController.postContactDetails
);
router.post(
  '/prototypes/create-account/security-questions',
  createAccountController.securityQuestions,
  createAccountController.postSecurityQuestions
);
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
router.post('/prototypes/site-review/assessment/activity', [
  siteReviewController.validateActivity,
  siteReviewController.populateActivity,
  siteReviewController.postAssessment,
]);
router.post('/prototypes/site-review/assessment/compliance', [
  siteReviewController.unpopulateAssessmentType,
  siteReviewController.validateAssessmentPost,
  siteReviewController.postAssessment,
]);
router.post('/prototypes/site-review/assessment/management-and-quality', [
  siteReviewController.unpopulateAssessmentType,
  siteReviewController.validateAssessmentPost,
  siteReviewController.postAssessment,
]);
router.post('/prototypes/site-review/assessment/people', [
  siteReviewController.unpopulateAssessmentType,
  siteReviewController.validateAssessmentPost,
  siteReviewController.postAssessment,
]);
router.post('/prototypes/site-review/assessment/premises', [
  siteReviewController.unpopulateAssessmentType,
  siteReviewController.validateAssessmentPost,
  siteReviewController.postAssessment,
]);
router.post('/prototypes/site-review/enter-details', [siteReviewController.validateDetails, siteReviewController.postDetails]);
router.post('/prototypes/site-review/v5/assessment-activity', siteReviewController.branchOnActivity);

// Brake tests
router.post('/prototypes/brake-test-config', brakeTestController.postBrakeConfig);
router.post('/prototypes/brake-test-entry', brakeTestController.postBrakeEntry);

// MTS Messaging
router.param('messageIndex', messagingController.isValidMessage);

router.get('/prototypes/messages/homepage', [
  messagingController.setupMessages,
  messagingController.setNotificationCounts,
  messagingController.getHomepage,
]);
router.get('/prototypes/messages/archive', messagingController.getArchive);
router.get('/prototypes/messages/inbox', messagingController.getMessages);
router.get('/prototypes/messages/:messageIndex', messagingController.getMessage);
router.get('/prototypes/messages/acknowledge/:messageIndex', [
  messagingController.unpinSpecialNotice,
  messagingController.acknowledgeMessage,
]);
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

// Compare tests
router.get('/prototypes/compare-tests/v8/start', compareTestsController.getStart);
router.get('/prototypes/compare-tests/v8/overview', compareTestsController.getOverview);
router.get('/prototypes/compare-tests/v8/record-outcome', compareTestsController.getRecordOutcome);
router.get('/prototypes/compare-tests/v8/assess-difference/:defectIndex', compareTestsController.getDifference);
router.get('/prototypes/compare-tests/v8/shortcomings', compareTestsController.getShortcomings);
router.get('/prototypes/compare-tests/v8/summary', compareTestsController.getSummary);
router.post('/prototypes/compare-tests/v8/assess-difference/:defectIndex', [
  compareTestsController.checkCompletion,
  compareTestsController.postDifference,
]);
router.post('/prototypes/compare-tests/v8/record-outcome', compareTestsController.postRecordOutcome);
router.post('/prototypes/compare-tests/v8/shortcomings', compareTestsController.postShortcomings);

// Create route from view path
router.get('*', miscController.viewFileRoute);

// MOT history vehicle type
router.post('/prototypes/mot-history-data/cvs/what-vehicle', mothController.postMothType);

export const allRoutes = router;
