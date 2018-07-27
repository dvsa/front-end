'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSummary = exports.postDetails = exports.getChooseSection = exports.postAssessment = exports.getAssessment = exports.clearReviewSession = undefined;

var _validation = require('./validators/validation.js');

Object.keys(_validation).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _validation[key];
    }
  });
});

var _index = require('./helpers/index.js');

Object.keys(_index).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index[key];
    }
  });
});

var _addToSession = require('../speech-to-text-search/helpers/add-to-session.js');

var _initViewData = require('./initViewData.js');

var _getLastInUrl = require('./helpers/getLastInUrl.js');

var _getMonth = require('./helpers/getMonth.js');

var _vm = require('vm');

/**
 * GET request middleware - clears session and returns to site review landing view
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */


//export * from './routes.js';
const clearReviewSession = exports.clearReviewSession = (req, res) => {
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
//import { renderViewWithValuesOrRedirect, renderWithErrorsOrRedirectWithSession } from './helpers';
const getAssessment = exports.getAssessment = (req, res) => {
  let assessmentType = (0, _getLastInUrl.getLastInUrl)(req);

  // If assessmentType type doesnt exist
  if (!assessmentType) {
    // Re-render previous view
    return res.render('/prototypes/site-review/choose-section/');
  }

  // Set session viewData
  req.session.viewData = req.session.viewData || (0, _initViewData.initViewData)();

  // Renders categories view
  return res.render(`prototypes/site-review/assessment/${assessmentType}/index`, { viewData: req.session.viewData });
};

/**
 * POST request middleware - posts an assessment
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
const postAssessment = exports.postAssessment = (req, res) => {
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
const getChooseSection = exports.getChooseSection = (req, res) => {
  // Render choose section index
  req.session.viewData = req.session.viewData || (0, _initViewData.initViewData)();
  return res.render('prototypes/site-review/choose-section/index', { viewData: req.session.viewData });
};

/**
 * Get request middleware - Gets the enter details form
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */

const postDetails = exports.postDetails = (req, res) => {
  req.session.viewData = req.session.viewData || {};

  const testerDetails = req.body || {};

  // create a friendly date from the three numbers input
  const dateString = `${testerDetails.testDay} ${(0, _getMonth.getMonth)(testerDetails.testMonth - 1)} ${testerDetails.testYear}`;

  // Check we have a valid date string
  if (dateString.indexOf('undefined') >= 0) {
    testerDetails.date = req.session.viewData.initialDate;
  } else {
    testerDetails.date = dateString;
  }

  // AdAppend initial data to viewdata
  req.session.viewData.testerDetails = testerDetails;
  return res.redirect('/prototypes/site-review/summary');
};

const getSummary = exports.getSummary = (req, res) => {
  return res.render('./prototypes/site-review/summary/index', {
    viewData: req.session.viewData
  });
};