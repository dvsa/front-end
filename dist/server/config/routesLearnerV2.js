'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routesLearnerV1 = routesLearnerV1;
function routesLearnerV1() {
  // learner config
  router.get('/prototypes/learner', learnerV2Controller.configGet);
  router.post('/prototypes/learner', learnerV2Controller.configPost);

  //******************************************************
  //      Various smaller sections
  //******************************************************
  // start
  router.get('/prototypes/learner/v2', learnerV2Controller.indexGet);
  router.post('/prototypes/learner/v2', learnerV2Controller.indexPost);
  // home
  router.get('/prototypes/learner/v2/home', learnerV2Controller.homeGet);
  // router.post('/prototypes/learner/v2/home', learnerV2Controller.homePost);

  // profile
  router.get('/prototypes/learner/v2/your-profile', learnerV2Controller.profileGet);
  // planned learning
  router.get('/prototypes/learner/v2/learning-plan', learnerV2Controller.plannedGet);
  // learning record
  router.get('/prototypes/learner/v2/learning-record', learnerV2Controller.recordGet);
  // suggested learning
  router.get('/prototypes/learner/v2/suggested-learning', learnerV2Controller.suggestedGet);

  // search
  router.get('/prototypes/learner/v2/search', learnerV2Controller.searchGet);
  router.post('/prototypes/learner/v2/search', learnerV2Controller.searchPost);

  // feedback
  router.get('/prototypes/learner/v2/feedback', learnerV2Controller.feedbackGet);

  // Actions
  router.get('/prototypes/learner/v2/actions', learnerV2Controller.actionsGet);
  router.post('/prototypes/learner/v2/actions', learnerV2Controller.actionsPost);

  //******************************************************
  //      Registration stuff
  //******************************************************
  // registration, email
  router.get('/prototypes/learner/v2/registration', learnerV2Controller.registerEmailGet);
  router.post('/prototypes/learner/v2/registration', learnerV2Controller.registerEmailPost);
  // registration, name
  router.get('/prototypes/learner/v2/registration/personal-details', learnerV2Controller.registerPersonalGet);
  router.post('/prototypes/learner/v2/registration/personal-details', learnerV2Controller.registerPersonalPost);

  // registration, job, part 1, department
  router.get('/prototypes/learner/v2/registration/department', learnerV2Controller.registerDepartmentGet);
  router.post('/prototypes/learner/v2/registration/department', learnerV2Controller.registerDepartmentPost);
  // registration, job, part 2, profession
  router.get('/prototypes/learner/v2/registration/area-of-work', learnerV2Controller.registerAreaGet);
  router.post('/prototypes/learner/v2/registration/area-of-work', learnerV2Controller.registerAreaPost);
  // registration, job, part 3, grade
  router.get('/prototypes/learner/v2/registration/grade', learnerV2Controller.registerGradeGet);
  router.post('/prototypes/learner/v2/registration/grade', learnerV2Controller.registerGradePost);

  // registration, password
  router.get('/prototypes/learner/v2/registration/password', learnerV2Controller.registerPasswordGet);
  router.post('/prototypes/learner/v2/registration/password', learnerV2Controller.registerPasswordPost);
  // registration, review
  router.get('/prototypes/learner/v2/registration/review', learnerV2Controller.registerReviewGet);
  router.post('/prototypes/learner/v2/registration/review', learnerV2Controller.registerReviewPost);
  // registration, complete
  router.get('/prototypes/learner/v2/registration/complete', learnerV2Controller.registerCompleteGet);
  // router.post('/prototypes/learner/v2/registration/complete', learnerV2Controller.registerCompletePost);

  // registration, complete
  router.get('/prototypes/learner/v2/resource', learnerV2Controller.resourceGet);

  //******************************************************
  //      Booking stuff
  //******************************************************
  router.get('/prototypes/learner/v2/booking', learnerV2Controller.bookingDateGet);
  router.post('/prototypes/learner/v2/booking', learnerV2Controller.bookingDatePost);
  router.get('/prototypes/learner/v2/booking/payment', learnerV2Controller.bookingPaymentGet);
  router.post('/prototypes/learner/v2/booking/payment', learnerV2Controller.bookingPaymentPost);
  router.get('/prototypes/learner/v2/booking/confirm', learnerV2Controller.bookingConfirmGet);
  router.get('/prototypes/learner/v2/booking/complete', learnerV2Controller.bookingCompleteGet);
}