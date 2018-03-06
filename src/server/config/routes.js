import { Router } from 'express';

import * as mainController from './../controllers/main.controller';
import * as miscController from './../controllers/misc.controller';
import * as recallsController from './../controllers/api/v1/recalls.controller';
import * as createAccountController from './../controllers/create-account';
import * as suspendTestersController from './../controllers/annual-assessment-tool/suspend-testers';

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

// Create route from view path
router.get('*', miscController.viewFileRoute);

export const allRoutes = router;
