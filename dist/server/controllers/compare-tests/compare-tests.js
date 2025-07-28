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
const getStart = (req, res) => {
  // Resets session data if doesn't exist
  req.session.viewData = req.session.viewData || (0, _initViewData.initViewData)();
  return res.render('./prototypes/compare-tests/v8/start');
};
exports.getStart = getStart;
const getOverview = (req, res) => {
  // Resets session data if doesn't exist
  req.session.viewData = req.session.viewData || (0, _initViewData.initViewData)();
  return res.render('./prototypes/compare-tests/v8/overview', {
    viewData: req.session.viewData
  });
};
exports.getOverview = getOverview;
const getRecordOutcome = (req, res) => {
  const scores = Array.from(req.session.viewData.defects).map(defect => parseInt(defect.points, 10));
  const shortComingsSubmitted = req.session.viewData.shortcomings.points;

  // Check if submitted score value is NaN (empty). Set to Zero if so.
  let shortComingsScore = isNaN(parseInt(shortComingsSubmitted)) ? 0 : parseInt(shortComingsSubmitted);

  // Add up defect points and add Shortcomings score
  const sumOfPoints = scores.reduce((running, a) => running + a) + shortComingsScore;
  req.session.viewData.score = sumOfPoints;
  return res.render('./prototypes/compare-tests/v8/record-outcome', {
    viewData: req.session.viewData
  });
};
exports.getRecordOutcome = getRecordOutcome;
const getDifference = (req, res) => {
  req.session.viewData.defectIndex = req.params.defectIndex;
  return res.render('./prototypes/compare-tests/v8/assess-difference', {
    viewData: req.session.viewData
  });
};
exports.getDifference = getDifference;
const checkCompletion = (req, res, next) => {
  // Mark defect as resolved
  const currentDefect = req.params.defectIndex;
  req.session.viewData.defects[currentDefect].isResolved = true;

  // Check if all defects are complete and set if true
  const allComplete = Array.from(req.session.viewData.defects).every(defect => defect.isResolved);
  req.session.viewData.allComplete = allComplete;
  next();
};
exports.checkCompletion = checkCompletion;
const postDifference = (req, res) => {
  const currentDefect = req.params.defectIndex;

  // Set form congtents into Viewdata
  req.session.viewData.defects[currentDefect].isResolved = true;
  req.session.viewData.defects[currentDefect].points = req.body.decision;
  req.session.viewData.defects[currentDefect].comment = req.body.justification;
  return res.redirect('/prototypes/compare-tests/v8/overview');
};
exports.postDifference = postDifference;
const postShortcomings = (req, res) => {
  const comment = req.body.shortcomings;
  const points = parseInt(req.body.points, 10);
  // Set form contents into Viewdata
  req.session.viewData.shortcomings.comment = comment;
  req.session.viewData.shortcomings.points = points;
  return res.redirect('/prototypes/compare-tests/v8/record-outcome');
};
exports.postShortcomings = postShortcomings;
const postRecordOutcome = (req, res) => {
  const comment = req.body.comment;
  const outcome = req.body.outcome;
  // Set form contents into Viewdata
  req.session.viewData.outcome.comment = comment;
  req.session.viewData.outcome.type = outcome;
  return res.redirect('/prototypes/compare-tests/v8/summary');
};
exports.postRecordOutcome = postRecordOutcome;
const getSummary = (req, res) => {
  return res.render('./prototypes/compare-tests/v8/summary', {
    viewData: req.session.viewData
  });
};
exports.getSummary = getSummary;
const getShortcomings = (req, res) => {
  return res.render('./prototypes/compare-tests/v8/shortcomings', {
    viewData: req.session.viewData
  });
};
exports.getShortcomings = getShortcomings;