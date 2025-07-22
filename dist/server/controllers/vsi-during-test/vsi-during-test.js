"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postOdometer = exports.postBrakes = exports.initViewData = exports.getSummary = exports.getPrevUrl = exports.getOdometer = exports.getInspection5 = exports.getInspection4 = exports.getInspection3 = exports.getInspection2 = exports.getInspection1 = exports.getAdvice = void 0;
var _initData = require("./initData.js");
var _helpers = require("../vts-changes/helpers/helpers.js");
var initViewData = exports.initViewData = function initViewData(req, res, next) {
  req.session.viewData = req.session.viewData || (0, _initData.initData)();
  next();
};
var getPrevUrl = exports.getPrevUrl = function getPrevUrl(req, res, next) {
  var fullPreviousUrl = req.header('Referer');
  req.session.viewData = req.session.viewData || (0, _initData.initData)();
  req.session.viewData.prevUrl = '/' + fullPreviousUrl.substring(fullPreviousUrl.indexOf('/prototypes') + 1);
  next();
};
var getInspection1 = exports.getInspection1 = function getInspection1(req, res) {
  return res.render('prototypes/vsi-during-test/inspection/index', {
    viewData: req.session.viewData
  });
};
var getInspection2 = exports.getInspection2 = function getInspection2(req, res) {
  return res.render('prototypes/vsi-during-test/inspection/inspection-2', {
    viewData: req.session.viewData
  });
};
var getInspection3 = exports.getInspection3 = function getInspection3(req, res) {
  return res.render('prototypes/vsi-during-test/inspection/inspection-3', {
    viewData: req.session.viewData
  });
};
var getInspection4 = exports.getInspection4 = function getInspection4(req, res) {
  return res.render('prototypes/vsi-during-test/inspection/inspection-4', {
    viewData: req.session.viewData
  });
};
var getInspection5 = exports.getInspection5 = function getInspection5(req, res) {
  return res.render('prototypes/vsi-during-test/inspection/inspection-5', {
    viewData: req.session.viewData
  });
};
var getSummary = exports.getSummary = function getSummary(req, res) {
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
var postOdometer = exports.postOdometer = function postOdometer(req, res) {
  req.session.viewData.odometer = req.body.odometer;
  return res.redirect("".concat(req.session.viewData.prevUrl));
};

/**
 * GET Middleware - Persist entered odometer reading when returning to /odometer
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
var getOdometer = exports.getOdometer = function getOdometer(req, res) {
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
var postBrakes = exports.postBrakes = function postBrakes(req, res) {
  req.session.viewData = req.session.viewData || (0, _initData.initData)();
  return res.render('./prototypes/vsi-during-test/inspection/inspection-4', {
    viewData: req.session.viewData
  });
};
var getAdvice = exports.getAdvice = function getAdvice(req, res) {
  req.session.viewData = req.session.viewData || (0, _initData.initData)();
  return res.render('prototypes/vsi-during-test/advice/index', {
    viewData: req.session.viewData
  });
};