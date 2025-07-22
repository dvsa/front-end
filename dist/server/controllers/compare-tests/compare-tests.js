"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postShortcomings = exports.postRecordOutcome = exports.postDifference = exports.getSummary = exports.getStart = exports.getShortcomings = exports.getRecordOutcome = exports.getOverview = exports.getDifference = exports.checkCompletion = void 0;
var _initViewData = require("./initViewData.js");
/**
 * GET request middleware - clears session
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
var getStart = exports.getStart = function getStart(req, res) {
  // Resets session data if doesn't exist
  req.session.viewData = req.session.viewData || (0, _initViewData.initViewData)();
  return res.render('./prototypes/compare-tests/v8/start');
};
var getOverview = exports.getOverview = function getOverview(req, res) {
  // Resets session data if doesn't exist
  req.session.viewData = req.session.viewData || (0, _initViewData.initViewData)();
  return res.render('./prototypes/compare-tests/v8/overview', {
    viewData: req.session.viewData
  });
};
var getRecordOutcome = exports.getRecordOutcome = function getRecordOutcome(req, res) {
  var scores = Array.from(req.session.viewData.defects).map(function (defect) {
    return parseInt(defect.points, 10);
  });
  var shortComingsSubmitted = req.session.viewData.shortcomings.points;

  // Check if submitted score value is NaN (empty). Set to Zero if so.
  var shortComingsScore = isNaN(parseInt(shortComingsSubmitted)) ? 0 : parseInt(shortComingsSubmitted);

  // Add up defect points and add Shortcomings score
  var sumOfPoints = scores.reduce(function (running, a) {
    return running + a;
  }) + shortComingsScore;
  req.session.viewData.score = sumOfPoints;
  return res.render('./prototypes/compare-tests/v8/record-outcome', {
    viewData: req.session.viewData
  });
};
var getDifference = exports.getDifference = function getDifference(req, res) {
  req.session.viewData.defectIndex = req.params.defectIndex;
  return res.render('./prototypes/compare-tests/v8/assess-difference', {
    viewData: req.session.viewData
  });
};
var checkCompletion = exports.checkCompletion = function checkCompletion(req, res, next) {
  // Mark defect as resolved
  var currentDefect = req.params.defectIndex;
  req.session.viewData.defects[currentDefect].isResolved = true;

  // Check if all defects are complete and set if true
  var allComplete = Array.from(req.session.viewData.defects).every(function (defect) {
    return defect.isResolved;
  });
  req.session.viewData.allComplete = allComplete;
  next();
};
var postDifference = exports.postDifference = function postDifference(req, res) {
  var currentDefect = req.params.defectIndex;

  // Set form congtents into Viewdata
  req.session.viewData.defects[currentDefect].isResolved = true;
  req.session.viewData.defects[currentDefect].points = req.body.decision;
  req.session.viewData.defects[currentDefect].comment = req.body.justification;
  return res.redirect('/prototypes/compare-tests/v8/overview');
};
var postShortcomings = exports.postShortcomings = function postShortcomings(req, res) {
  var comment = req.body.shortcomings;
  var points = parseInt(req.body.points, 10);
  // Set form contents into Viewdata
  req.session.viewData.shortcomings.comment = comment;
  req.session.viewData.shortcomings.points = points;
  return res.redirect('/prototypes/compare-tests/v8/record-outcome');
};
var postRecordOutcome = exports.postRecordOutcome = function postRecordOutcome(req, res) {
  var comment = req.body.comment;
  var outcome = req.body.outcome;
  // Set form contents into Viewdata
  req.session.viewData.outcome.comment = comment;
  req.session.viewData.outcome.type = outcome;
  return res.redirect('/prototypes/compare-tests/v8/summary');
};
var getSummary = exports.getSummary = function getSummary(req, res) {
  return res.render('./prototypes/compare-tests/v8/summary', {
    viewData: req.session.viewData
  });
};
var getShortcomings = exports.getShortcomings = function getShortcomings(req, res) {
  return res.render('./prototypes/compare-tests/v8/shortcomings', {
    viewData: req.session.viewData
  });
};