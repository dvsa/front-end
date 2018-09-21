'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAdvice = exports.postBrakes = exports.getOdometer = exports.getInspectionWithOdometer = exports.postOdometer = undefined;

var _initData = require('./initData.js');

var _helpers = require('../vts-changes/helpers/helpers.js');

/**
 * POST Middleware - Take inputted odometer reading and persist on inspection sheet #4
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
const postOdometer = exports.postOdometer = (req, res) => {
  req.session.viewData = req.body || (0, _initData.initData)();
  return res.redirect('/prototypes/vsi-during-test/inspection/inspection-4');
};

/**
 * GET Middleware - Pick up GET from redirect on POSTing odometer
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
const getInspectionWithOdometer = exports.getInspectionWithOdometer = (req, res) => {
  return res.render('./prototypes/vsi-during-test/inspection/inspection-4', { viewData: req.session.viewData });
};

/**
 * GET Middleware - Persist entered odometer reading when returning to /odometer
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
const getOdometer = exports.getOdometer = (req, res) => {
  req.session.viewData = req.session.viewData || (0, _initData.initData)();
  return res.render('./prototypes/vsi-during-test/odometer/index', { viewData: req.session.viewData });
};

/**
 * GET Middleware - Persist entered odometer reading when returning to /odometer
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
const postBrakes = exports.postBrakes = (req, res) => {
  req.session.viewData = req.session.viewData || (0, _initData.initData)();
  return res.render('./prototypes/vsi-during-test/inspection/inspection-4', { viewData: req.session.viewData });
};

const getAdvice = exports.getAdvice = (req, res) => {
  const fullPreviousUrl = req.header('Referer');
  let backButton = '/' + fullPreviousUrl.substring(fullPreviousUrl.indexOf('/prototypes') + 1);
  return res.render('prototypes/vsi-during-test/advice/index', { viewData: { backButton } });
};