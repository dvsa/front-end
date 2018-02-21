// Booking
// get course data
let generalData = require('./data');

export function bookingDateGet(req, res) {
  let viewData, courseDates;

  courseDates = generalData.courseDates;

  viewData = {
    courseDates,
  };

  return res.render('prototypes/learner/v1/booking/index', viewData);
}

export function bookingDatePost(req, res) {
  const { availableCourses } = req.body;

  // availableCourses

  return res.redirect('/prototypes/learner/v1/booking/payment');
}

export function bookingPaymentGet(req, res) {
  let viewData;

  viewData = {};

  return res.render('prototypes/learner/v1/booking/payment', viewData);
}

export function bookingConfirmGet(req, res) {
  return res.render('prototypes/learner/v1/booking/confirm', viewData);
}

export function bookingCompleteGet(req, res) {
  return res.render('prototypes/learner/v1/booking/complete', viewData);
}
