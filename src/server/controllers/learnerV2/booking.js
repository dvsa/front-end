// Booking
// get course data
let generalData = require('./data');

export function bookingDateGet(req, res) {
  let viewData, courseDates;

  courseDates = generalData.courseDates;

  viewData = {
    courseDates,
  };

  return res.render('prototypes/learner/v2/booking/index', viewData);
}

export function bookingDatePost(req, res) {
  const { availableCourses } = req.body;

  // availableCourses

  return res.redirect('/prototypes/learner/v2/booking/payment');
}

// PAYMENT

export function bookingPaymentGet(req, res) {
  let viewData;

  viewData = {};

  return res.render('prototypes/learner/v2/booking/payment', viewData);
}

export function bookingPaymentPost(req, res) {
  return res.redirect('/prototypes/learner/v2/booking/confirm');
}

// CONFIRM

export function bookingConfirmGet(req, res) {
  let viewData;

  viewData = {};

  return res.render('prototypes/learner/v2/booking/confirm', viewData);
}

// COMPLETE

export function bookingCompleteGet(req, res) {
  let viewData;

  viewData = {};

  return res.render('prototypes/learner/v2/booking/complete', viewData);
}
