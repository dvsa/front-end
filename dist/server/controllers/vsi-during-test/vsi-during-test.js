'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMotInspection = exports.postOdometer = undefined;

var _initData = require('./initData.js');

var _helpers = require('../vts-changes/helpers/helpers.js');

/**
 * POST Middleware - Initialise session for Stage 1
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
const postOdometer = exports.postOdometer = (req, res) => {
  req.session.viewData = req.body || (0, _initData.initData)();
  return res.redirect('/prototypes/vsi-during-test/inspection');
};

/**
 * GET Middleware - Initialise session for Stage 1
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
const getMotInspection = exports.getMotInspection = (req, res) => {
  req.session.viewData = req.session.viewData || (0, _initData.initData)();
  console.log(req.session.viewData);
  return res.render('./prototypes/vsi-during-test/inspection/index', { viewData: req.session.viewData });
};