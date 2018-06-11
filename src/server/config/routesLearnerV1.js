//******************************************************
//
//      v9 end-to-end learner journey custom routes
//
//******************************************************
// learner config

import * as learnerV9Controller from '../controllers/learnerV9';

router.get('/prototypes/learner/v9/config', learnerV9Controller.configGet);
router.post('/prototypes/learner/v9/config', learnerV9Controller.configPost);

//******************************************************
//      Various smaller sections
//******************************************************
// start
router.get('/prototypes/learner/v9', learnerV9Controller.indexGet);
router.post('/prototypes/learner/v9', learnerV9Controller.indexPost);
// home
router.get('/prototypes/learner/v9/home', learnerV9Controller.homeGet);
// router.post('/prototypes/learner/v9/home', learnerV9Controller.homePost);

// profile
router.get('/prototypes/learner/v9/your-profile', learnerV9Controller.profileGet);
// planned learning
router.get('/prototypes/learner/v9/learning-plan', learnerV9Controller.plannedGet);
// learning record
router.get('/prototypes/learner/v9/learning-record', learnerV9Controller.recordGet);
// suggested learning
router.get('/prototypes/learner/v9/suggested-learning', learnerV9Controller.suggestedGet);
router.get('/prototypes/learner/v9/suggested-learning-full', learnerV9Controller.suggestedFullGet);
router.get('/prototypes/learner/v9/suggested-learning-all', learnerV9Controller.suggestedAllGet);
router.get('/prototypes/learner/v9/suggested-learning-hmrc', learnerV9Controller.suggestedAllHMRCGet);
router.get('/prototypes/learner/v9/suggested-learning-hmrc-cols', learnerV9Controller.suggestedAllHMRCColsGet);

// profile
router.get('/prototypes/learner/v9/privacy', learnerV9Controller.privacyGet);

// search
router.get('/prototypes/learner/v9/search', learnerV9Controller.searchGet);
router.post('/prototypes/learner/v9/search', learnerV9Controller.searchPost);

// feedback
router.get('/prototypes/learner/v9/feedback', learnerV9Controller.feedbackGet);
router.post('/prototypes/learner/v9/feedback', learnerV9Controller.feedbackPost);

// edit areas of work with levels
router.get('/prototypes/learner/v9/your-profile/area-of-work', learnerV9Controller.areasGet);
router.post('/prototypes/learner/v9/your-profile/area-of-work', learnerV9Controller.areasPost);

router.get('/prototypes/learner/v9/your-profile/area-of-work/levels', learnerV9Controller.areasLevelsGet);
router.post('/prototypes/learner/v9/your-profile/area-of-work/levels', learnerV9Controller.areasLevelsPost);

router.get('/prototypes/learner/v9/your-profile/interests', learnerV9Controller.interestsGet);
router.post('/prototypes/learner/v9/your-profile/interests', learnerV9Controller.interestsPost);

router.get('/prototypes/learner/v9/your-profile/area-of-work/joined-levels', learnerV9Controller.areasJoinedLevelsGet);
router.post('/prototypes/learner/v9/your-profile/area-of-work/joined-levels', learnerV9Controller.areasJoinedLevelsPost);

// As product manager for show and tell
router.get('/prototypes/learner/v9/your-profile/area-of-work/joined-levels-pm', learnerV9Controller.areasJoinedLevelsPMGet);
router.post('/prototypes/learner/v9/your-profile/area-of-work/joined-levels-pm', learnerV9Controller.areasJoinedLevelsPMPost);

router.get('/prototypes/learner/v9/your-profile/other-areas-of-work', learnerV9Controller.otherAreasGet);
router.post('/prototypes/learner/v9/your-profile/other-areas-of-work', learnerV9Controller.otherAreasPost);

// Actions
router.get('/prototypes/learner/v9/actions', learnerV9Controller.actionsGet);
router.post('/prototypes/learner/v9/actions', learnerV9Controller.actionsPost);

//******************************************************
//      Registration stuff
//******************************************************
// registration, email
router.get('/prototypes/learner/v9/registration', learnerV9Controller.registerEmailGet);
router.post('/prototypes/learner/v9/registration', learnerV9Controller.registerEmailPost);
// registration, name
router.get('/prototypes/learner/v9/registration/personal-details', learnerV9Controller.registerPersonalGet);
router.post('/prototypes/learner/v9/registration/personal-details', learnerV9Controller.registerPersonalPost);

// registration, job, part 1, department
router.get('/prototypes/learner/v9/registration/department', learnerV9Controller.registerDepartmentGet);
router.post('/prototypes/learner/v9/registration/department', learnerV9Controller.registerDepartmentPost);
// registration, job, part 2, profession
router.get('/prototypes/learner/v9/registration/area-of-work', learnerV9Controller.registerAreaGet);
router.post('/prototypes/learner/v9/registration/area-of-work', learnerV9Controller.registerAreaPost);
// registration, job, part 3, grade
router.get('/prototypes/learner/v9/registration/grade', learnerV9Controller.registerGradeGet);
router.post('/prototypes/learner/v9/registration/grade', learnerV9Controller.registerGradePost);

// registration, password
router.get('/prototypes/learner/v9/registration/password', learnerV9Controller.registerPasswordGet);
router.post('/prototypes/learner/v9/registration/password', learnerV9Controller.registerPasswordPost);
// registration, review
router.get('/prototypes/learner/v9/registration/review', learnerV9Controller.registerReviewGet);
router.post('/prototypes/learner/v9/registration/review', learnerV9Controller.registerReviewPost);
// registration, complete
router.get('/prototypes/learner/v9/registration/complete', learnerV9Controller.registerCompleteGet);
// router.post('/prototypes/learner/v9/registration/complete', learnerV9Controller.registerCompletePost);

// registration, complete
router.get('/prototypes/learner/v9/resource', learnerV9Controller.resourceGet);
router.post('/prototypes/learner/v9/resource', learnerV9Controller.resourcePost);

//******************************************************
//      Booking stuff
//******************************************************
router.get('/prototypes/learner/v9/booking', learnerV9Controller.bookingDateGet);
router.post('/prototypes/learner/v9/booking', learnerV9Controller.bookingDatePost);
router.get('/prototypes/learner/v9/booking/payment', learnerV9Controller.bookingPaymentGet);
router.post('/prototypes/learner/v9/booking/payment', learnerV9Controller.bookingPaymentPost);
router.get('/prototypes/learner/v9/booking/confirm', learnerV9Controller.bookingConfirmGet);
router.get('/prototypes/learner/v9/booking/complete', learnerV9Controller.bookingCompleteGet);

// Booking elements page in Library
router.get('/prototypes/layouts/booking', learnerV9Controller.bookingPOCGet);

//******************************************************
//      authentication, forgotten/reset/create password etc
//******************************************************
router.get('/prototypes/learner/v9/reset-password', learnerV9Controller.resetPasswordGet);
router.post('/prototypes/learner/v9/reset-password', learnerV9Controller.resetPasswordPost);
router.get('/prototypes/learner/v9/email-sent', learnerV9Controller.emailSentGet);
router.get('/prototypes/learner/v9/enter-new-password', learnerV9Controller.enterNewPasswordGet);
router.post('/prototypes/learner/v9/enter-new-password', learnerV9Controller.enterNewPasswordPost);
router.get('/prototypes/learner/v9/reset-success', learnerV9Controller.resetSuccessGet);

router.get('/prototypes/learner/v9/create-new-password', learnerV9Controller.createNewPasswordGet);
router.post('/prototypes/learner/v9/create-new-password', learnerV9Controller.createNewPasswordPost);
router.get('/prototypes/learner/v9/create-success', learnerV9Controller.createSuccessGet);

// SCORMS fire safety
router.get('/prototypes/learner/v9/scorms/basic-fire-safety', learnerV9Controller.basicFireSafetyGet);
router.post('/prototypes/learner/v9/scorms/basic-fire-safety', learnerV9Controller.basicFireSafetyPost);
// scorm done
router.get('/prototypes/learner/v9/scorms/basic-fire-safety/complete', learnerV9Controller.scormCompleteGet);

//******************************************************
//      admin section
//******************************************************
router.get('/prototypes/learner/v9/admin', learnerV9Controller.adminGet);
router.post('/prototypes/learner/v9/admin', learnerV9Controller.adminPost);

router.get('/prototypes/learner/v9/admin/course-list', learnerV9Controller.adminCourseListGet);
router.post('/prototypes/learner/v9/admin/course-list', learnerV9Controller.adminCourseListPost);

router.get('/prototypes/learner/v9/admin/events-list', learnerV9Controller.adminEventsListGet);
router.post('/prototypes/learner/v9/admin/events-list', learnerV9Controller.adminEventsListPost);

router.get('/prototypes/learner/v9/admin/edit', learnerV9Controller.adminEditGet);
router.post('/prototypes/learner/v9/admin/edit', learnerV9Controller.adminEditPost);
router.get('/prototypes/learner/v9/admin/add', learnerV9Controller.adminAddGet);
router.post('/prototypes/learner/v9/admin/add', learnerV9Controller.adminAddPost);
router.get('/prototypes/learner/v9/admin/add-details', learnerV9Controller.adminAddDetailsGet);
router.post('/prototypes/learner/v9/admin/add-details', learnerV9Controller.adminAddDetailsPost);

router.get('/prototypes/learner/v9/admin/add-assets', learnerV9Controller.adminAddAssetsGet);
router.post('/prototypes/learner/v9/admin/add-assets', learnerV9Controller.adminAddAssetsPost);

router.get('/prototypes/learner/v9/admin/add-review', learnerV9Controller.adminAddReviewGet);
router.post('/prototypes/learner/v9/admin/add-review', learnerV9Controller.adminAddReviewPost);
router.get('/prototypes/learner/v9/admin/add-complete', learnerV9Controller.adminAddCompleteGet);
router.post('/prototypes/learner/v9/admin/add-complete', learnerV9Controller.adminAddCompletePost);
