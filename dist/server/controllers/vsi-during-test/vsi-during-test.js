'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAdvice = exports.postBrakes = exports.getOdometer = exports.postOdometer = exports.getSummary = exports.getInspection5 = exports.getInspection4 = exports.getInspection3 = exports.getInspection2 = exports.getInspection1 = exports.getPrevUrl = exports.initViewData = undefined;

var _initData = require('./initData.js');

var _helpers = require('../vts-changes/helpers/helpers.js');

const initViewData = exports.initViewData = (req, res, next) => {
  req.session.viewData = req.session.viewData || (0, _initData.initData)();
  next();
};

const getPrevUrl = exports.getPrevUrl = (req, res, next) => {
  const fullPreviousUrl = req.header('Referer');
  req.session.viewData = req.session.viewData || (0, _initData.initData)();
  req.session.viewData.prevUrl = '/' + fullPreviousUrl.substring(fullPreviousUrl.indexOf('/prototypes') + 1);
  next();
};

const getInspection1 = exports.getInspection1 = (req, res) => {
  return res.render('prototypes/vsi-during-test/inspection/index', { viewData: req.session.viewData });
};

const getInspection2 = exports.getInspection2 = (req, res) => {
  return res.render('prototypes/vsi-during-test/inspection/inspection-2', { viewData: req.session.viewData });
};

const getInspection3 = exports.getInspection3 = (req, res) => {
  return res.render('prototypes/vsi-during-test/inspection/inspection-3', { viewData: req.session.viewData });
};

const getInspection4 = exports.getInspection4 = (req, res) => {
  return res.render('prototypes/vsi-during-test/inspection/inspection-4', { viewData: req.session.viewData });
};

const getInspection5 = exports.getInspection5 = (req, res) => {
  return res.render('prototypes/vsi-during-test/inspection/inspection-5', { viewData: req.session.viewData });
};

const getSummary = exports.getSummary = (req, res) => {
  return res.render('prototypes/vsi-during-test/summary/index', { viewData: req.session.viewData });
};

/**
 * POST Middleware - Take inputted odometer reading and persist on inspection sheet #4
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
const postOdometer = exports.postOdometer = (req, res) => {
  req.session.viewData.odometer = req.body.odometer;
  return res.redirect(`${req.session.viewData.prevUrl}`);
};

/**
 * GET Middleware - Persist entered odometer reading when returning to /odometer
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
const getOdometer = exports.getOdometer = (req, res) => {
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
  req.session.viewData = req.session.viewData || (0, _initData.initData)();
  return res.render('prototypes/vsi-during-test/advice/index', { viewData: req.session.viewData });
};