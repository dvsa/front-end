'use strict';

var _learnerV = require('../controllers/learnerV7');

var learnerV7Controller = _interopRequireWildcard(_learnerV);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

router.get('/prototypes/learner/v7/config', learnerV7Controller.configGet); //******************************************************
//
//      v7 end-to-end learner journey custom routes
//
//******************************************************
// learner config

router.post('/prototypes/learner/v7/config', learnerV7Controller.configPost);

//******************************************************
//      Various smaller sections
//******************************************************
// start
router.get('/prototypes/learner/v7', learnerV7Controller.indexGet);
router.post('/prototypes/learner/v7', learnerV7Controller.indexPost);
// home
router.get('/prototypes/learner/v7/home', learnerV7Controller.homeGet);
// router.post('/prototypes/learner/v7/home', learnerV7Controller.homePost);

// profile
router.get('/prototypes/learner/v7/your-profile', learnerV7Controller.profileGet);
// planned learning
router.get('/prototypes/learner/v7/learning-plan', learnerV7Controller.plannedGet);
// learning record
router.get('/prototypes/learner/v7/learning-record', learnerV7Controller.recordGet);
// suggested learning
router.get('/prototypes/learner/v7/suggested-learning', learnerV7Controller.suggestedGet);
router.get('/prototypes/learner/v7/suggested-learning-full', learnerV7Controller.suggestedFullGet);

// profile
router.get('/prototypes/learner/v7/privacy', learnerV7Controller.privacyGet);

// search
router.get('/prototypes/learner/v7/search', learnerV7Controller.searchGet);
router.post('/prototypes/learner/v7/search', learnerV7Controller.searchPost);

// feedback
router.get('/prototypes/learner/v7/feedback', learnerV7Controller.feedbackGet);
router.post('/prototypes/learner/v7/feedback', learnerV7Controller.feedbackPost);

// edit areas of work with levels
router.get('/prototypes/learner/v7/your-profile/area-of-work', learnerV7Controller.areasGet);
router.post('/prototypes/learner/v7/your-profile/area-of-work', learnerV7Controller.areasPost);

router.get('/prototypes/learner/v7/your-profile/area-of-work/levels', learnerV7Controller.areasLevelsGet);
router.post('/prototypes/learner/v7/your-profile/area-of-work/levels', learnerV7Controller.areasLevelsPost);

router.get('/prototypes/learner/v7/your-profile/interests', learnerV7Controller.interestsGet);
router.post('/prototypes/learner/v7/your-profile/interests', learnerV7Controller.interestsPost);

router.get('/prototypes/learner/v7/your-profile/area-of-work/joined-levels', learnerV7Controller.areasJoinedLevelsGet);
router.post('/prototypes/learner/v7/your-profile/area-of-work/joined-levels', learnerV7Controller.areasJoinedLevelsPost);

// As product manager for show and tell
router.get('/prototypes/learner/v7/your-profile/area-of-work/joined-levels-pm', learnerV7Controller.areasJoinedLevelsPMGet);
router.post('/prototypes/learner/v7/your-profile/area-of-work/joined-levels-pm', learnerV7Controller.areasJoinedLevelsPMPost);

router.get('/prototypes/learner/v7/your-profile/other-areas-of-work', learnerV7Controller.otherAreasGet);
router.post('/prototypes/learner/v7/your-profile/other-areas-of-work', learnerV7Controller.otherAreasPost);

// Actions
router.get('/prototypes/learner/v7/actions', learnerV7Controller.actionsGet);
router.post('/prototypes/learner/v7/actions', learnerV7Controller.actionsPost);

//******************************************************
//      Registration stuff
//******************************************************
// registration, email
router.get('/prototypes/learner/v7/registration', learnerV7Controller.registerEmailGet);
router.post('/prototypes/learner/v7/registration', learnerV7Controller.registerEmailPost);
// registration, name
router.get('/prototypes/learner/v7/registration/personal-details', learnerV7Controller.registerPersonalGet);
router.post('/prototypes/learner/v7/registration/personal-details', learnerV7Controller.registerPersonalPost);

// registration, job, part 1, department
router.get('/prototypes/learner/v7/registration/department', learnerV7Controller.registerDepartmentGet);
router.post('/prototypes/learner/v7/registration/department', learnerV7Controller.registerDepartmentPost);
// registration, job, part 2, profession
router.get('/prototypes/learner/v7/registration/area-of-work', learnerV7Controller.registerAreaGet);
router.post('/prototypes/learner/v7/registration/area-of-work', learnerV7Controller.registerAreaPost);
// registration, job, part 3, grade
router.get('/prototypes/learner/v7/registration/grade', learnerV7Controller.registerGradeGet);
router.post('/prototypes/learner/v7/registration/grade', learnerV7Controller.registerGradePost);

// registration, password
router.get('/prototypes/learner/v7/registration/password', learnerV7Controller.registerPasswordGet);
router.post('/prototypes/learner/v7/registration/password', learnerV7Controller.registerPasswordPost);
// registration, review
router.get('/prototypes/learner/v7/registration/review', learnerV7Controller.registerReviewGet);
router.post('/prototypes/learner/v7/registration/review', learnerV7Controller.registerReviewPost);
// registration, complete
router.get('/prototypes/learner/v7/registration/complete', learnerV7Controller.registerCompleteGet);
// router.post('/prototypes/learner/v7/registration/complete', learnerV7Controller.registerCompletePost);

// registration, complete
router.get('/prototypes/learner/v7/resource', learnerV7Controller.resourceGet);
router.post('/prototypes/learner/v7/resource', learnerV7Controller.resourcePost);

//******************************************************
//      Booking stuff
//******************************************************
router.get('/prototypes/learner/v7/booking', learnerV7Controller.bookingDateGet);
router.post('/prototypes/learner/v7/booking', learnerV7Controller.bookingDatePost);
router.get('/prototypes/learner/v7/booking/payment', learnerV7Controller.bookingPaymentGet);
router.post('/prototypes/learner/v7/booking/payment', learnerV7Controller.bookingPaymentPost);
router.get('/prototypes/learner/v7/booking/confirm', learnerV7Controller.bookingConfirmGet);
router.get('/prototypes/learner/v7/booking/complete', learnerV7Controller.bookingCompleteGet);

//******************************************************
//      authentication, forgotten/reset/create password etc
//******************************************************
router.get('/prototypes/learner/v7/reset-password', learnerV7Controller.resetPasswordGet);
router.post('/prototypes/learner/v7/reset-password', learnerV7Controller.resetPasswordPost);
router.get('/prototypes/learner/v7/email-sent', learnerV7Controller.emailSentGet);
router.get('/prototypes/learner/v7/enter-new-password', learnerV7Controller.enterNewPasswordGet);
router.post('/prototypes/learner/v7/enter-new-password', learnerV7Controller.enterNewPasswordPost);
router.get('/prototypes/learner/v7/reset-success', learnerV7Controller.resetSuccessGet);

router.get('/prototypes/learner/v7/create-new-password', learnerV7Controller.createNewPasswordGet);
router.post('/prototypes/learner/v7/create-new-password', learnerV7Controller.createNewPasswordPost);
router.get('/prototypes/learner/v7/create-success', learnerV7Controller.createSuccessGet);

// SCORMS fire safety
router.get('/prototypes/learner/v7/scorms/basic-fire-safety', learnerV7Controller.basicFireSafetyGet);
router.post('/prototypes/learner/v7/scorms/basic-fire-safety', learnerV7Controller.basicFireSafetyPost);
// scorm done
router.get('/prototypes/learner/v7/scorms/basic-fire-safety/complete', learnerV7Controller.scormCompleteGet);