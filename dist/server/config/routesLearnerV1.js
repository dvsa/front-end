'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routesLearnerV1 = routesLearnerV1;
function routesLearnerV1() {
  // learner config
  router.get('/prototypes/learner', learnerV1Controller.configGet);
  router.post('/prototypes/learner', learnerV1Controller.configPost);

  //******************************************************
  //      Various smaller sections
  //******************************************************
  // start
  router.get('/prototypes/learner/v1', learnerV1Controller.indexGet);
  router.post('/prototypes/learner/v1', learnerV1Controller.indexPost);
  // home
  router.get('/prototypes/learner/v1/home', learnerV1Controller.homeGet);
  // router.post('/prototypes/learner/v1/home', learnerV1Controller.homePost);

  // profile
  router.get('/prototypes/learner/v1/your-profile', learnerV1Controller.profileGet);
  // planned learning
  router.get('/prototypes/learner/v1/learning-plan', learnerV1Controller.plannedGet);
  // learning record
  router.get('/prototypes/learner/v1/learning-record', learnerV1Controller.recordGet);
  // suggested learning
  router.get('/prototypes/learner/v1/suggested-learning', learnerV1Controller.suggestedGet);

  // search
  router.get('/prototypes/learner/v1/search', learnerV1Controller.searchGet);
  router.post('/prototypes/learner/v1/search', learnerV1Controller.searchPost);

  // feedback
  router.get('/prototypes/learner/v1/feedback', learnerV1Controller.feedbackGet);

  // Actions
  router.get('/prototypes/learner/v1/actions', learnerV1Controller.actionsGet);
  router.post('/prototypes/learner/v1/actions', learnerV1Controller.actionsPost);

  //******************************************************
  //      Registration stuff
  //******************************************************
  // registration, email
  router.get('/prototypes/learner/v1/registration', learnerV1Controller.registerEmailGet);
  router.post('/prototypes/learner/v1/registration', learnerV1Controller.registerEmailPost);
  // registration, name
  router.get('/prototypes/learner/v1/registration/personal-details', learnerV1Controller.registerPersonalGet);
  router.post('/prototypes/learner/v1/registration/personal-details', learnerV1Controller.registerPersonalPost);

  // registration, job, part 1, department
  router.get('/prototypes/learner/v1/registration/department', learnerV1Controller.registerDepartmentGet);
  router.post('/prototypes/learner/v1/registration/department', learnerV1Controller.registerDepartmentPost);
  // registration, job, part 2, profession
  router.get('/prototypes/learner/v1/registration/area-of-work', learnerV1Controller.registerAreaGet);
  router.post('/prototypes/learner/v1/registration/area-of-work', learnerV1Controller.registerAreaPost);
  // registration, job, part 3, grade
  router.get('/prototypes/learner/v1/registration/grade', learnerV1Controller.registerGradeGet);
  router.post('/prototypes/learner/v1/registration/grade', learnerV1Controller.registerGradePost);

  // registration, password
  router.get('/prototypes/learner/v1/registration/password', learnerV1Controller.registerPasswordGet);
  router.post('/prototypes/learner/v1/registration/password', learnerV1Controller.registerPasswordPost);
  // registration, review
  router.get('/prototypes/learner/v1/registration/review', learnerV1Controller.registerReviewGet);
  router.post('/prototypes/learner/v1/registration/review', learnerV1Controller.registerReviewPost);
  // registration, complete
  router.get('/prototypes/learner/v1/registration/complete', learnerV1Controller.registerCompleteGet);
  // router.post('/prototypes/learner/v1/registration/complete', learnerV1Controller.registerCompletePost);

  // registration, complete
  router.get('/prototypes/learner/v1/resource', learnerV1Controller.resourceGet);

  //******************************************************
  //      Booking stuff
  //******************************************************
  router.get('/prototypes/learner/v1/booking', learnerV1Controller.bookingDateGet);
  router.post('/prototypes/learner/v1/booking', learnerV1Controller.bookingDatePost);
  router.get('/prototypes/learner/v1/booking/payment', learnerV1Controller.bookingPaymentGet);
  router.post('/prototypes/learner/v1/booking/payment', learnerV1Controller.bookingPaymentPost);
  router.get('/prototypes/learner/v1/booking/confirm', learnerV1Controller.bookingConfirmGet);
  router.get('/prototypes/learner/v1/booking/complete', learnerV1Controller.bookingCompleteGet);
}