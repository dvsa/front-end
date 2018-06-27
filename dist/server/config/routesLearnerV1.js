'use strict';

var _learnerV = require('../controllers/learnerV10');

var learnerV10Controller = _interopRequireWildcard(_learnerV);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

router.get('/prototypes/learner/v10/config', learnerV10Controller.configGet); //******************************************************
//
//      v10 end-to-end learner journey custom routes
//
//******************************************************
// learner config

router.post('/prototypes/learner/v10/config', learnerV10Controller.configPost);

//******************************************************
//      Various smaller sections
//******************************************************
// start
router.get('/prototypes/learner/v10', learnerV10Controller.indexGet);
router.post('/prototypes/learner/v10', learnerV10Controller.indexPost);
// home
router.get('/prototypes/learner/v10/home', learnerV10Controller.homeGet);
// router.post('/prototypes/learner/v10/home', learnerV10Controller.homePost);

// profile
router.get('/prototypes/learner/v10/your-profile', learnerV10Controller.profileGet);
// planned learning
router.get('/prototypes/learner/v10/learning-plan', learnerV10Controller.plannedGet);
// learning record
router.get('/prototypes/learner/v10/learning-record', learnerV10Controller.recordGet);
// suggested learning
router.get('/prototypes/learner/v10/suggested-learning', learnerV10Controller.suggestedGet);
router.get('/prototypes/learner/v10/suggested-learning-full', learnerV10Controller.suggestedFullGet);
router.get('/prototypes/learner/v10/suggested-learning-all', learnerV10Controller.suggestedAllGet);
router.get('/prototypes/learner/v10/suggested-learning-hmrc', learnerV10Controller.suggestedAllHMRCGet);
router.get('/prototypes/learner/v10/suggested-learning-hmrc-cols', learnerV10Controller.suggestedAllHMRCColsGet);

// profile
router.get('/prototypes/learner/v10/privacy', learnerV10Controller.privacyGet);

// search
router.get('/prototypes/learner/v10/search', learnerV10Controller.searchGet);
router.post('/prototypes/learner/v10/search', learnerV10Controller.searchPost);

// feedback
router.get('/prototypes/learner/v10/feedback', learnerV10Controller.feedbackGet);
router.post('/prototypes/learner/v10/feedback', learnerV10Controller.feedbackPost);

// edit areas of work with levels
router.get('/prototypes/learner/v10/your-profile/area-of-work', learnerV10Controller.areasGet);
router.post('/prototypes/learner/v10/your-profile/area-of-work', learnerV10Controller.areasPost);

router.get('/prototypes/learner/v10/your-profile/area-of-work/levels', learnerV10Controller.areasLevelsGet);
router.post('/prototypes/learner/v10/your-profile/area-of-work/levels', learnerV10Controller.areasLevelsPost);

router.get('/prototypes/learner/v10/your-profile/interests', learnerV10Controller.interestsGet);
router.post('/prototypes/learner/v10/your-profile/interests', learnerV10Controller.interestsPost);

router.get('/prototypes/learner/v10/your-profile/area-of-work/joined-levels', learnerV10Controller.areasJoinedLevelsGet);
router.post('/prototypes/learner/v10/your-profile/area-of-work/joined-levels', learnerV10Controller.areasJoinedLevelsPost);

// As product manager for show and tell
router.get('/prototypes/learner/v10/your-profile/area-of-work/joined-levels-pm', learnerV10Controller.areasJoinedLevelsPMGet);
router.post('/prototypes/learner/v10/your-profile/area-of-work/joined-levels-pm', learnerV10Controller.areasJoinedLevelsPMPost);

router.get('/prototypes/learner/v10/your-profile/other-areas-of-work', learnerV10Controller.otherAreasGet);
router.post('/prototypes/learner/v10/your-profile/other-areas-of-work', learnerV10Controller.otherAreasPost);

// Actions
router.get('/prototypes/learner/v10/actions', learnerV10Controller.actionsGet);
router.post('/prototypes/learner/v10/actions', learnerV10Controller.actionsPost);

//******************************************************
//      Registration stuff
//******************************************************
// registration, email
router.get('/prototypes/learner/v10/registration', learnerV10Controller.registerEmailGet);
router.post('/prototypes/learner/v10/registration', learnerV10Controller.registerEmailPost);
// registration, name
router.get('/prototypes/learner/v10/registration/personal-details', learnerV10Controller.registerPersonalGet);
router.post('/prototypes/learner/v10/registration/personal-details', learnerV10Controller.registerPersonalPost);

// registration, job, part 1, department
router.get('/prototypes/learner/v10/registration/department', learnerV10Controller.registerDepartmentGet);
router.post('/prototypes/learner/v10/registration/department', learnerV10Controller.registerDepartmentPost);
// registration, job, part 2, profession
router.get('/prototypes/learner/v10/registration/area-of-work', learnerV10Controller.registerAreaGet);
router.post('/prototypes/learner/v10/registration/area-of-work', learnerV10Controller.registerAreaPost);
// registration, job, part 3, grade
router.get('/prototypes/learner/v10/registration/grade', learnerV10Controller.registerGradeGet);
router.post('/prototypes/learner/v10/registration/grade', learnerV10Controller.registerGradePost);

// registration, password
router.get('/prototypes/learner/v10/registration/password', learnerV10Controller.registerPasswordGet);
router.post('/prototypes/learner/v10/registration/password', learnerV10Controller.registerPasswordPost);
// registration, review
router.get('/prototypes/learner/v10/registration/review', learnerV10Controller.registerReviewGet);
router.post('/prototypes/learner/v10/registration/review', learnerV10Controller.registerReviewPost);
// registration, complete
router.get('/prototypes/learner/v10/registration/complete', learnerV10Controller.registerCompleteGet);
// router.post('/prototypes/learner/v10/registration/complete', learnerV10Controller.registerCompletePost);

// registration, complete
router.get('/prototypes/learner/v10/resource', learnerV10Controller.resourceGet);
router.post('/prototypes/learner/v10/resource', learnerV10Controller.resourcePost);

//******************************************************
//      Booking stuff
//******************************************************
router.get('/prototypes/learner/v10/booking', learnerV10Controller.bookingDateGet);
router.post('/prototypes/learner/v10/booking', learnerV10Controller.bookingDatePost);
router.get('/prototypes/learner/v10/booking/payment', learnerV10Controller.bookingPaymentGet);
router.post('/prototypes/learner/v10/booking/payment', learnerV10Controller.bookingPaymentPost);
router.get('/prototypes/learner/v10/booking/confirm', learnerV10Controller.bookingConfirmGet);
router.get('/prototypes/learner/v10/booking/complete', learnerV10Controller.bookingCompleteGet);

// Booking elements page in Library
router.get('/prototypes/layouts/booking', learnerV10Controller.bookingPOCGet);

//******************************************************
//      authentication, forgotten/reset/create password etc
//******************************************************
router.get('/prototypes/learner/v10/reset-password', learnerV10Controller.resetPasswordGet);
router.post('/prototypes/learner/v10/reset-password', learnerV10Controller.resetPasswordPost);
router.get('/prototypes/learner/v10/email-sent', learnerV10Controller.emailSentGet);
router.get('/prototypes/learner/v10/enter-new-password', learnerV10Controller.enterNewPasswordGet);
router.post('/prototypes/learner/v10/enter-new-password', learnerV10Controller.enterNewPasswordPost);
router.get('/prototypes/learner/v10/reset-success', learnerV10Controller.resetSuccessGet);

router.get('/prototypes/learner/v10/create-new-password', learnerV10Controller.createNewPasswordGet);
router.post('/prototypes/learner/v10/create-new-password', learnerV10Controller.createNewPasswordPost);
router.get('/prototypes/learner/v10/create-success', learnerV10Controller.createSuccessGet);

// SCORMS fire safety
router.get('/prototypes/learner/v10/scorms/basic-fire-safety', learnerV10Controller.basicFireSafetyGet);
router.post('/prototypes/learner/v10/scorms/basic-fire-safety', learnerV10Controller.basicFireSafetyPost);
// scorm done
router.get('/prototypes/learner/v10/scorms/basic-fire-safety/complete', learnerV10Controller.scormCompleteGet);

//******************************************************
//      admin section
//******************************************************
router.get('/prototypes/learner/v10/admin', learnerV10Controller.adminGet);
router.post('/prototypes/learner/v10/admin', learnerV10Controller.adminPost);

router.get('/prototypes/learner/v10/admin/course-list', learnerV10Controller.adminCourseListGet);
router.post('/prototypes/learner/v10/admin/course-list', learnerV10Controller.adminCourseListPost);

router.get('/prototypes/learner/v10/admin/events-list', learnerV10Controller.adminEventsListGet);
router.post('/prototypes/learner/v10/admin/events-list', learnerV10Controller.adminEventsListPost);

router.get('/prototypes/learner/v10/admin/edit', learnerV10Controller.adminEditGet);
router.post('/prototypes/learner/v10/admin/edit', learnerV10Controller.adminEditPost);
router.get('/prototypes/learner/v10/admin/add', learnerV10Controller.adminAddGet);
router.post('/prototypes/learner/v10/admin/add', learnerV10Controller.adminAddPost);
router.get('/prototypes/learner/v10/admin/add-details', learnerV10Controller.adminAddDetailsGet);
router.post('/prototypes/learner/v10/admin/add-details', learnerV10Controller.adminAddDetailsPost);

router.get('/prototypes/learner/v10/admin/add-assets', learnerV10Controller.adminAddAssetsGet);
router.post('/prototypes/learner/v10/admin/add-assets', learnerV10Controller.adminAddAssetsPost);

router.get('/prototypes/learner/v10/admin/add-review', learnerV10Controller.adminAddReviewGet);
router.post('/prototypes/learner/v10/admin/add-review', learnerV10Controller.adminAddReviewPost);
router.get('/prototypes/learner/v10/admin/add-complete', learnerV10Controller.adminAddCompleteGet);
router.post('/prototypes/learner/v10/admin/add-complete', learnerV10Controller.adminAddCompletePost);