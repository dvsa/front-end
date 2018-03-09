let version3Routes = function() {
  //******************************************************
  //
  //      v3 end-to-end learner journey custom routes
  //
  //******************************************************
  // learner config
  // import * as learnerV3Controller from "../controllers/learnerV3;

  router.get('/prototypes/learner/v3/config', learnerV3Controller.configGet);
  router.post('/prototypes/learner/v3/config', learnerV3Controller.configPost);

  //******************************************************
  //      Various smaller sections
  //******************************************************
  // start
  router.get('/prototypes/learner/v3', learnerV3Controller.indexGet);
  router.post('/prototypes/learner/v3', learnerV3Controller.indexPost);
  // home
  router.get('/prototypes/learner/v3/home', learnerV3Controller.homeGet);
  // router.post('/prototypes/learner/v3/home', learnerV3Controller.homePost);

  // profile
  router.get('/prototypes/learner/v3/your-profile', learnerV3Controller.profileGet);
  // planned learning
  router.get('/prototypes/learner/v3/learning-plan', learnerV3Controller.plannedGet);
  // learning record
  router.get('/prototypes/learner/v3/learning-record', learnerV3Controller.recordGet);
  // suggested learning
  router.get('/prototypes/learner/v3/suggested-learning', learnerV3Controller.suggestedGet);

  // search
  router.get('/prototypes/learner/v3/search', learnerV3Controller.searchGet);
  router.post('/prototypes/learner/v3/search', learnerV3Controller.searchPost);

  // feedback
  router.get('/prototypes/learner/v3/feedback', learnerV3Controller.feedbackGet);

  // Actions
  router.get('/prototypes/learner/v3/actions', learnerV3Controller.actionsGet);
  router.post('/prototypes/learner/v3/actions', learnerV3Controller.actionsPost);

  //******************************************************
  //      Registration stuff
  //******************************************************
  // registration, email
  router.get('/prototypes/learner/v3/registration', learnerV3Controller.registerEmailGet);
  router.post('/prototypes/learner/v3/registration', learnerV3Controller.registerEmailPost);
  // registration, name
  router.get('/prototypes/learner/v3/registration/personal-details', learnerV3Controller.registerPersonalGet);
  router.post('/prototypes/learner/v3/registration/personal-details', learnerV3Controller.registerPersonalPost);

  // registration, job, part 1, department
  router.get('/prototypes/learner/v3/registration/department', learnerV3Controller.registerDepartmentGet);
  router.post('/prototypes/learner/v3/registration/department', learnerV3Controller.registerDepartmentPost);
  // registration, job, part 2, profession
  router.get('/prototypes/learner/v3/registration/area-of-work', learnerV3Controller.registerAreaGet);
  router.post('/prototypes/learner/v3/registration/area-of-work', learnerV3Controller.registerAreaPost);
  // registration, job, part 3, grade
  router.get('/prototypes/learner/v3/registration/grade', learnerV3Controller.registerGradeGet);
  router.post('/prototypes/learner/v3/registration/grade', learnerV3Controller.registerGradePost);

  // registration, password
  router.get('/prototypes/learner/v3/registration/password', learnerV3Controller.registerPasswordGet);
  router.post('/prototypes/learner/v3/registration/password', learnerV3Controller.registerPasswordPost);
  // registration, review
  router.get('/prototypes/learner/v3/registration/review', learnerV3Controller.registerReviewGet);
  router.post('/prototypes/learner/v3/registration/review', learnerV3Controller.registerReviewPost);
  // registration, complete
  router.get('/prototypes/learner/v3/registration/complete', learnerV3Controller.registerCompleteGet);
  // router.post('/prototypes/learner/v3/registration/complete', learnerV3Controller.registerCompletePost);

  // registration, complete
  router.get('/prototypes/learner/v3/resource', learnerV3Controller.resourceGet);

  //******************************************************
  //      Booking stuff
  //******************************************************
  router.get('/prototypes/learner/v3/booking', learnerV3Controller.bookingDateGet);
  router.post('/prototypes/learner/v3/booking', learnerV3Controller.bookingDatePost);
  router.get('/prototypes/learner/v3/booking/payment', learnerV3Controller.bookingPaymentGet);
  router.post('/prototypes/learner/v3/booking/payment', learnerV3Controller.bookingPaymentPost);
  router.get('/prototypes/learner/v3/booking/confirm', learnerV3Controller.bookingConfirmGet);
  router.get('/prototypes/learner/v3/booking/complete', learnerV3Controller.bookingCompleteGet);
};

// module.exports.version3Routes = version3Routes;
