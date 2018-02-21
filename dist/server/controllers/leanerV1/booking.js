'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bookingDateGet = bookingDateGet;
exports.bookingDatePost = bookingDatePost;
exports.bookingPaymentGet = bookingPaymentGet;
exports.bookingConfirmGet = bookingConfirmGet;
exports.bookingCompleteGet = bookingCompleteGet;
// Booking
// get course data
let generalData = require('./data');

function bookingDateGet(req, res) {
  let viewData, courseDates;

  courseDates = generalData.courseDates;

  viewData = {
    courseDates
  };

  return res.render('prototypes/learner/v1/booking/index', viewData);
}

function bookingDatePost(req, res) {
  const { availableCourses } = req.body;

  // availableCourses

  return res.redirect('/prototypes/learner/v1/booking/payment');
}

function bookingPaymentGet(req, res) {
  let viewData;

  viewData = {};

  return res.render('prototypes/learner/v1/booking/payment', viewData);
}

function bookingConfirmGet(req, res) {
  return res.render('prototypes/learner/v1/booking/confirm', viewData);
}

function bookingCompleteGet(req, res) {
  return res.render('prototypes/learner/v1/booking/complete', viewData);
}