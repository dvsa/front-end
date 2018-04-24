'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bookingDateGet = bookingDateGet;
exports.bookingDatePost = bookingDatePost;
exports.bookingPaymentGet = bookingPaymentGet;
exports.bookingPaymentPost = bookingPaymentPost;
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

  return res.render('prototypes/learner/v6/booking/index', viewData);
}

function bookingDatePost(req, res) {
  const { availableCourses } = req.body;

  // availableCourses

  return res.redirect('/prototypes/learner/v6/booking/payment');
}

// PAYMENT

function bookingPaymentGet(req, res) {
  let viewData;

  viewData = {};

  return res.render('prototypes/learner/v6/booking/payment', viewData);
}

function bookingPaymentPost(req, res) {
  return res.redirect('/prototypes/learner/v6/booking/confirm');
}

// CONFIRM

function bookingConfirmGet(req, res) {
  let viewData;

  viewData = {};

  return res.render('prototypes/learner/v6/booking/confirm', viewData);
}

// COMPLETE

function bookingCompleteGet(req, res) {
  let viewData;

  viewData = {};

  return res.render('prototypes/learner/v6/booking/complete', viewData);
}