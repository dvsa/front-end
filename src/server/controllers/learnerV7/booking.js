// Booking
// get course data
let generalData = require('./data');

export function bookingDateGet(req, res) {
  let viewData, courseDates;

  courseDates = generalData.courseDates;

  viewData = {
    courseDates,
  };

  return res.render('prototypes/learner/v7/booking/index', viewData);
}

export function bookingDatePost(req, res) {
  const { availableCourses } = req.body;

  // availableCourses

  return res.redirect('/prototypes/learner/v7/booking/payment');
}

// PAYMENT

export function bookingPaymentGet(req, res) {
  let viewData;

  viewData = {};

  return res.render('prototypes/learner/v7/booking/payment', viewData);
}

export function bookingPaymentPost(req, res) {
  return res.redirect('/prototypes/learner/v7/booking/confirm');
}

// CONFIRM

export function bookingConfirmGet(req, res) {
  let viewData;

  viewData = {};

  return res.render('prototypes/learner/v7/booking/confirm', viewData);
}

// COMPLETE

export function bookingCompleteGet(req, res) {
  let viewData;

  viewData = {};

  return res.render('prototypes/learner/v7/booking/complete', viewData);
}

// BOOKING ELEMENTS

export function bookingPOCGet(req, res) {
  let viewData;

  viewData = {};

  return res.render('prototypes/layouts/booking/index', viewData);
}
