//******************************************************
//
//      v8 end-to-end learner journey custom routes
//
//******************************************************
// learner config

import * as learnerV8Controller from '../controllers/learnerV8';

router.get('/prototypes/learner/v8/config', learnerV8Controller.configGet);
router.post('/prototypes/learner/v8/config', learnerV8Controller.configPost);

//******************************************************
//      Various smaller sections
//******************************************************
// start
router.get('/prototypes/learner/v8', learnerV8Controller.indexGet);
router.post('/prototypes/learner/v8', learnerV8Controller.indexPost);
// home
router.get('/prototypes/learner/v8/home', learnerV8Controller.homeGet);
// router.post('/prototypes/learner/v8/home', learnerV8Controller.homePost);

// profile
router.get('/prototypes/learner/v8/your-profile', learnerV8Controller.profileGet);
// planned learning
router.get('/prototypes/learner/v8/learning-plan', learnerV8Controller.plannedGet);
// learning record
router.get('/prototypes/learner/v8/learning-record', learnerV8Controller.recordGet);
// suggested learning
router.get('/prototypes/learner/v8/suggested-learning', learnerV8Controller.suggestedGet);
router.get('/prototypes/learner/v8/suggested-learning-full', learnerV8Controller.suggestedFullGet);
router.get('/prototypes/learner/v8/suggested-learning-all', learnerV8Controller.suggestedAllGet);
router.get('/prototypes/learner/v8/suggested-learning-hmrc', learnerV8Controller.suggestedAllHMRCGet);
router.get('/prototypes/learner/v8/suggested-learning-hmrc-cols', learnerV8Controller.suggestedAllHMRCColsGet);

// profile
router.get('/prototypes/learner/v8/privacy', learnerV8Controller.privacyGet);

// search
router.get('/prototypes/learner/v8/search', learnerV8Controller.searchGet);
router.post('/prototypes/learner/v8/search', learnerV8Controller.searchPost);

// feedback
router.get('/prototypes/learner/v8/feedback', learnerV8Controller.feedbackGet);
router.post('/prototypes/learner/v8/feedback', learnerV8Controller.feedbackPost);

// edit areas of work with levels
router.get('/prototypes/learner/v8/your-profile/area-of-work', learnerV8Controller.areasGet);
router.post('/prototypes/learner/v8/your-profile/area-of-work', learnerV8Controller.areasPost);

router.get('/prototypes/learner/v8/your-profile/area-of-work/levels', learnerV8Controller.areasLevelsGet);
router.post('/prototypes/learner/v8/your-profile/area-of-work/levels', learnerV8Controller.areasLevelsPost);

router.get('/prototypes/learner/v8/your-profile/interests', learnerV8Controller.interestsGet);
router.post('/prototypes/learner/v8/your-profile/interests', learnerV8Controller.interestsPost);

router.get('/prototypes/learner/v8/your-profile/area-of-work/joined-levels', learnerV8Controller.areasJoinedLevelsGet);
router.post('/prototypes/learner/v8/your-profile/area-of-work/joined-levels', learnerV8Controller.areasJoinedLevelsPost);

// As product manager for show and tell
router.get('/prototypes/learner/v8/your-profile/area-of-work/joined-levels-pm', learnerV8Controller.areasJoinedLevelsPMGet);
router.post('/prototypes/learner/v8/your-profile/area-of-work/joined-levels-pm', learnerV8Controller.areasJoinedLevelsPMPost);

router.get('/prototypes/learner/v8/your-profile/other-areas-of-work', learnerV8Controller.otherAreasGet);
router.post('/prototypes/learner/v8/your-profile/other-areas-of-work', learnerV8Controller.otherAreasPost);

// Actions
router.get('/prototypes/learner/v8/actions', learnerV8Controller.actionsGet);
router.post('/prototypes/learner/v8/actions', learnerV8Controller.actionsPost);

//******************************************************
//      Registration stuff
//******************************************************
// registration, email
router.get('/prototypes/learner/v8/registration', learnerV8Controller.registerEmailGet);
router.post('/prototypes/learner/v8/registration', learnerV8Controller.registerEmailPost);
// registration, name
router.get('/prototypes/learner/v8/registration/personal-details', learnerV8Controller.registerPersonalGet);
router.post('/prototypes/learner/v8/registration/personal-details', learnerV8Controller.registerPersonalPost);

// registration, job, part 1, department
router.get('/prototypes/learner/v8/registration/department', learnerV8Controller.registerDepartmentGet);
router.post('/prototypes/learner/v8/registration/department', learnerV8Controller.registerDepartmentPost);
// registration, job, part 2, profession
router.get('/prototypes/learner/v8/registration/area-of-work', learnerV8Controller.registerAreaGet);
router.post('/prototypes/learner/v8/registration/area-of-work', learnerV8Controller.registerAreaPost);
// registration, job, part 3, grade
router.get('/prototypes/learner/v8/registration/grade', learnerV8Controller.registerGradeGet);
router.post('/prototypes/learner/v8/registration/grade', learnerV8Controller.registerGradePost);

// registration, password
router.get('/prototypes/learner/v8/registration/password', learnerV8Controller.registerPasswordGet);
router.post('/prototypes/learner/v8/registration/password', learnerV8Controller.registerPasswordPost);
// registration, review
router.get('/prototypes/learner/v8/registration/review', learnerV8Controller.registerReviewGet);
router.post('/prototypes/learner/v8/registration/review', learnerV8Controller.registerReviewPost);
// registration, complete
router.get('/prototypes/learner/v8/registration/complete', learnerV8Controller.registerCompleteGet);
// router.post('/prototypes/learner/v8/registration/complete', learnerV8Controller.registerCompletePost);

// registration, complete
router.get('/prototypes/learner/v8/resource', learnerV8Controller.resourceGet);
router.post('/prototypes/learner/v8/resource', learnerV8Controller.resourcePost);

//******************************************************
//      Booking stuff
//******************************************************
router.get('/prototypes/learner/v8/booking', learnerV8Controller.bookingDateGet);
router.post('/prototypes/learner/v8/booking', learnerV8Controller.bookingDatePost);
router.get('/prototypes/learner/v8/booking/payment', learnerV8Controller.bookingPaymentGet);
router.post('/prototypes/learner/v8/booking/payment', learnerV8Controller.bookingPaymentPost);
router.get('/prototypes/learner/v8/booking/confirm', learnerV8Controller.bookingConfirmGet);
router.get('/prototypes/learner/v8/booking/complete', learnerV8Controller.bookingCompleteGet);

// Booking elements page in Library
router.get('/prototypes/layouts/booking', learnerV8Controller.bookingPOCGet);

//******************************************************
//      authentication, forgotten/reset/create password etc
//******************************************************
router.get('/prototypes/learner/v8/reset-password', learnerV8Controller.resetPasswordGet);
router.post('/prototypes/learner/v8/reset-password', learnerV8Controller.resetPasswordPost);
router.get('/prototypes/learner/v8/email-sent', learnerV8Controller.emailSentGet);
router.get('/prototypes/learner/v8/enter-new-password', learnerV8Controller.enterNewPasswordGet);
router.post('/prototypes/learner/v8/enter-new-password', learnerV8Controller.enterNewPasswordPost);
router.get('/prototypes/learner/v8/reset-success', learnerV8Controller.resetSuccessGet);

router.get('/prototypes/learner/v8/create-new-password', learnerV8Controller.createNewPasswordGet);
router.post('/prototypes/learner/v8/create-new-password', learnerV8Controller.createNewPasswordPost);
router.get('/prototypes/learner/v8/create-success', learnerV8Controller.createSuccessGet);

// SCORMS fire safety
router.get('/prototypes/learner/v8/scorms/basic-fire-safety', learnerV8Controller.basicFireSafetyGet);
router.post('/prototypes/learner/v8/scorms/basic-fire-safety', learnerV8Controller.basicFireSafetyPost);
// scorm done
router.get('/prototypes/learner/v8/scorms/basic-fire-safety/complete', learnerV8Controller.scormCompleteGet);
