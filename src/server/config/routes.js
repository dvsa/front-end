import { Router } from 'express';

<<<<<<< HEAD
import * as mainController from '../controllers/main.controller';
import * as miscController from '../controllers/misc.controller';
import * as recallsController from '../controllers/api/v1/recalls.controller';
import * as createAccountController from '../controllers/create-account';
import * as suspendTestersController from '../controllers/annual-assessment-tool/suspend-testers';
import * as motTestResultsController from '../controllers/mot-test/mot-test';
import * as speechToTextController from '../controllers/speech-to-text-search/speech-to-text-search';
import * as siteReview from '../controllers/site-review/site-review';
=======
import * as mainController from './../controllers/main.controller';
import * as miscController from './../controllers/misc.controller';
import * as recallsController from './../controllers/api/v1/recalls.controller';
import * as createAccountController from './../controllers/create-account';
import * as suspendTestersController from './../controllers/annual-assessment-tool/suspend-testers';
import * as motTestResultsController from './../controllers/mot-test/mot-test';
import * as speechToTextController from './../controllers/speech-to-text-search/speech-to-text-search';
import * as siteReviewController from './../controllers/site-review/site-review';
>>>>>>> Created the first half of the site review journey

const router = Router();

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

// Site review: Summary view
//router.get('/prototypes/site-review/enter-details', siteReview.getDetails);
router.post('/prototypes/site-review/enter-details', siteReview.postDetails);
router.get('/prototypes/site-review/summary/', siteReview.getSummary);

// Site review paths
router.get('/prototypes/site-review-new/', siteReviewController.clearReviewSession);
router.get('/prototypes/site-review-new/choose-section', siteReviewController.getChooseSection);
router.get('/prototypes/site-review-new/assessment/activity', siteReviewController.getAssessment);
router.get('/prototypes/site-review-new/assessment/compliance', siteReviewController.getAssessment);
router.get('/prototypes/site-review-new/assessment/management-and-quality', siteReviewController.getAssessment);
router.get('/prototypes/site-review-new/assessment/people', siteReviewController.getAssessment);
router.get('/prototypes/site-review-new/assessment/premises', siteReviewController.getAssessment);
router.post('/prototypes/site-review-new/assessment/activity', [siteReviewController.validateActivity, siteReviewController.populateActivity, siteReviewController.postAssessment]);
router.post('/prototypes/site-review-new/assessment/compliance', [
  siteReviewController.unpopulateAssessmentType,
  siteReviewController.validateAssessmentPost,
  siteReviewController.postAssessment,
]);
router.post('/prototypes/site-review-new/assessment/management-and-quality', [
  siteReviewController.unpopulateAssessmentType,
  siteReviewController.validateAssessmentPost,
  siteReviewController.postAssessment,
]);
router.post('/prototypes/site-review-new/assessment/people', [
  siteReviewController.unpopulateAssessmentType,
  siteReviewController.validateAssessmentPost,
  siteReviewController.postAssessment,
]);
router.post('/prototypes/site-review-new/assessment/premises', [
  siteReviewController.unpopulateAssessmentType,
  siteReviewController.validateAssessmentPost,
  siteReviewController.postAssessment,
]);

// Create route from view path
router.get('*', miscController.viewFileRoute);

export const allRoutes = router;
