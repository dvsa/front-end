'use strict';

var _learnerV = require('../controllers/learnerV5');

var learnerV5Controller = _interopRequireWildcard(_learnerV);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

let version5Routes = function () {
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
};

module.exports.version5Routes = version5Routes;