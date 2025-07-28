"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  clearReviewSession: true,
  getAssessment: true,
  postAssessment: true,
  getChooseSection: true,
  getDetails: true,
  postDetails: true,
  getSummary: true,
  branchOnActivity: true
};
exports.postDetails = exports.postAssessment = exports.getSummary = exports.getDetails = exports.getChooseSection = exports.getAssessment = exports.clearReviewSession = exports.branchOnActivity = void 0;
var _addToSession = require("../speech-to-text-search/helpers/add-to-session.js");
var _initViewData = require("./initViewData.js");
var _getLastInUrl = require("./helpers/getLastInUrl.js");
var _getMonth = require("./helpers/getMonth.js");
var _validation = require("./validators/validation.js");
Object.keys(_validation).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _validation[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _validation[key];
    }
  });
});
var _index = require("./helpers/index.js");
Object.keys(_index).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _index[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index[key];
    }
  });
});
/**
 * GET request middleware - clears session and returns to site review landing view
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
const clearReviewSession = (req, res) => {
  // Resets session data if exists
  if (req.session.viewData) {
    req.session.viewData = (0, _initViewData.initViewData)();
  }
  // Renders view
  return res.render('prototypes/site-review/index');
};

/**
 *
 * GET request middleware - gets the assessment view
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
exports.clearReviewSession = clearReviewSession;
const getAssessment = (req, res) => {
  let assessmentType = (0, _getLastInUrl.getLastInUrl)(req);

  // If assessmentType type doesnt exist
  if (!assessmentType) {
    // Re-render previous view
    return res.render('/prototypes/site-review/choose-section/');
  }

  // Set session viewData
  req.session.viewData = req.session.viewData || (0, _initViewData.initViewData)();

  // Renders categories view
  return res.render(`prototypes/site-review/assessment/${assessmentType}/index`, {
    viewData: req.session.viewData
  });
};

/**
 * POST request middleware - posts an assessment
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
exports.getAssessment = getAssessment;
const postAssessment = (req, res) => {
  let assessmentType = (0, _getLastInUrl.getLastInUrl)(req);
  if (req.session.viewData[assessmentType].errors.length) {
    return res.redirect(`/prototypes/site-review/assessment/${assessmentType}`);
  }

  // Redirect to section on successful post
  return res.redirect('/prototypes/site-review/choose-section/');
};

/**
 *
 * GET request middleware - gets the choose section view
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
exports.postAssessment = postAssessment;
const getChooseSection = (req, res) => {
  // Render choose section index
  req.session.viewData = req.session.viewData || (0, _initViewData.initViewData)();
  return res.render('prototypes/site-review/choose-section/index', {
    viewData: req.session.viewData
  });
};

/**
 *
 * GET request middleware - gets the choose section view
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
exports.getChooseSection = getChooseSection;
const getDetails = (req, res) => {
  // Render choose section index
  req.session.viewData = req.session.viewData || (0, _initViewData.initViewData)();
  return res.render('prototypes/site-review/enter-details/index', {
    viewData: req.session.viewData
  });
};

/**
 * Get request middleware - Posts details form summary view
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
exports.getDetails = getDetails;
const postDetails = (req, res) => {
  // If there are errors, reload details page
  if (req.session.viewData.testerDetails.errors.length) {
    return res.redirect(`/prototypes/site-review/enter-details`);
  }

  // Add friendly date to viewData
  //req.session.viewData = req.session.viewData || {};
  const testerDetails = req.body || {};
  // Create a friendly date from the three numbers input
  let testDate = `${testerDetails.testDay} ${(0, _getMonth.getMonth)(testerDetails.testMonth - 1)} ${testerDetails.testYear}`;

  // Check we have a valid date string
  if (testDate.indexOf('undefined') == 1) {
    testDate = '02 August 2018';
  }

  // Append form data to viewdata in session
  req.session.viewData.testerDetails.date = testDate;

  // No errors - Successful post
  return res.redirect('/prototypes/site-review/choose-section');
};

/**
 * Get request middleware - Handle redirect to summary view
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
exports.postDetails = postDetails;
const getSummary = (req, res) => {
  return res.render('./prototypes/site-review/summary/index', {
    viewData: req.session.viewData
  });
};
exports.getSummary = getSummary;
const branchOnActivity = (req, res) => {
  const radioResponse = req.body['radio-activity'];
  if (!radioResponse) {
    return res.redirect('/prototypes/site-review/v5/assessment-activity');
  } else if (radioResponse === 'yes') {
    return res.redirect('/prototypes/site-review/v5/assessment-activity-enter-mot-number');
  } else {
    return res.redirect('/prototypes/site-review/v5/assessment-activity-choose-reason');
  }
};
exports.branchOnActivity = branchOnActivity;