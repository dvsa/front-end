"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postOdometer = exports.postBrakes = exports.initViewData = exports.getSummary = exports.getPrevUrl = exports.getOdometer = exports.getInspection5 = exports.getInspection4 = exports.getInspection3 = exports.getInspection2 = exports.getInspection1 = exports.getAdvice = void 0;
var _initData = require("./initData.js");
var _helpers = require("../vts-changes/helpers/helpers.js");
const initViewData = (req, res, next) => {
  req.session.viewData = req.session.viewData || (0, _initData.initData)();
  next();
};
exports.initViewData = initViewData;
const getPrevUrl = (req, res, next) => {
  const fullPreviousUrl = req.header('Referer');
  req.session.viewData = req.session.viewData || (0, _initData.initData)();
  req.session.viewData.prevUrl = '/' + fullPreviousUrl.substring(fullPreviousUrl.indexOf('/prototypes') + 1);
  next();
};
exports.getPrevUrl = getPrevUrl;
const getInspection1 = (req, res) => {
  return res.render('prototypes/vsi-during-test/inspection/index', {
    viewData: req.session.viewData
  });
};
exports.getInspection1 = getInspection1;
const getInspection2 = (req, res) => {
  return res.render('prototypes/vsi-during-test/inspection/inspection-2', {
    viewData: req.session.viewData
  });
};
exports.getInspection2 = getInspection2;
const getInspection3 = (req, res) => {
  return res.render('prototypes/vsi-during-test/inspection/inspection-3', {
    viewData: req.session.viewData
  });
};
exports.getInspection3 = getInspection3;
const getInspection4 = (req, res) => {
  return res.render('prototypes/vsi-during-test/inspection/inspection-4', {
    viewData: req.session.viewData
  });
};
exports.getInspection4 = getInspection4;
const getInspection5 = (req, res) => {
  return res.render('prototypes/vsi-during-test/inspection/inspection-5', {
    viewData: req.session.viewData
  });
};
exports.getInspection5 = getInspection5;
const getSummary = (req, res) => {
  return res.render('prototypes/vsi-during-test/summary/index', {
    viewData: req.session.viewData
  });
};

/**
 * POST Middleware - Take inputted odometer reading and persist on inspection sheet #4
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
exports.getSummary = getSummary;
const postOdometer = (req, res) => {
  req.session.viewData.odometer = req.body.odometer;
  return res.redirect(`${req.session.viewData.prevUrl}`);
};

/**
 * GET Middleware - Persist entered odometer reading when returning to /odometer
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
exports.postOdometer = postOdometer;
const getOdometer = (req, res) => {
  return res.render('./prototypes/vsi-during-test/odometer/index', {
    viewData: req.session.viewData
  });
};

/**
 * GET Middleware - Persist entered odometer reading when returning to /odometer
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
exports.getOdometer = getOdometer;
const postBrakes = (req, res) => {
  req.session.viewData = req.session.viewData || (0, _initData.initData)();
  return res.render('./prototypes/vsi-during-test/inspection/inspection-4', {
    viewData: req.session.viewData
  });
};
exports.postBrakes = postBrakes;
const getAdvice = (req, res) => {
  req.session.viewData = req.session.viewData || (0, _initData.initData)();
  return res.render('prototypes/vsi-during-test/advice/index', {
    viewData: req.session.viewData
  });
};
exports.getAdvice = getAdvice;