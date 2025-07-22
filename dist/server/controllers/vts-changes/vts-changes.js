"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  resetSession: true,
  startJourney: true,
  getStart: true,
  postType: true,
  postStage: true,
  getStage: true,
  getConfirmation: true
};
exports.startJourney = exports.resetSession = exports.postType = exports.postStage = exports.getStart = exports.getStage = exports.getConfirmation = void 0;
var _initChangeData = require("./initChangeData.js");
var _helpers = require("./helpers/helpers");
var _getLastInUrl = require("../site-review/helpers/getLastInUrl.js");
var _vm = require("vm");
var _validation = require("./validators/validation.js");
Object.keys(_validation).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _validation[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _validation[key];
    }
  });
});
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/**
 * GET Middleware - Initialise session for Stage 1
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
var resetSession = exports.resetSession = function resetSession(req, res, next) {
  // Reset session to dummy data from home page if not present
  req.session.viewData = (0, _initChangeData.initViewData)();
  next();
};

/**
 * GET Middleware - Initialise session for Journey Start
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
var startJourney = exports.startJourney = function startJourney(req, res) {
  req.session.viewData = (0, _initChangeData.initViewData)();
  var version = req.query.v || '0';
  req.session.viewData.version = version;
  return res.render('./prototypes/vts-changes/home', {
    viewData: req.session.viewData
  });
};

/**
 * GET Middleware - Get Start page
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
var getStart = exports.getStart = function getStart(req, res) {
  return res.render('./prototypes/vts-changes/start', {
    viewData: req.session.viewData
  });
};

/**
 * POST Middleware - Declare types of equipment being changed
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
var postType = exports.postType = function postType(req, res) {
  // Get submitted values and clean up nulls...
  var formData = req.body;
  delete formData['null'];
  // ...add to session
  req.session.viewData.questions.type.answer = formData;

  // Push each answer into array of types for display in Summary
  var labelArr = Object.entries(formData).map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      key = _ref2[0],
      value = _ref2[1];
    return key;
  });
  var types = [];
  var answer = '';
  labelArr.forEach(function (label) {
    if (label == 'headlamp') {
      answer = 'Headlamp beam tester';
    } else if (label == 'plate') {
      answer = 'Plate brake tester';
    } else if (label == 'roller') {
      answer = 'Roller brake tester';
    } else if (label == 'wheel') {
      answer = 'Wheel play detector';
    } else if (label == 'ramp') {
      answer = 'Ramp, hoist or lift';
    }
    types.push(answer);
  });

  // Add array of types to session
  req.session.viewData.typeNames = types;

  // If there were errors in the session from validator, return to question
  var errors = req.session.viewData.questions.type.errors[0];
  if (errors) {
    return res.redirect("/prototypes/vts-changes/type");
  }
  // Proceed to next question
  return res.redirect("/prototypes/vts-changes/approved");
};

/**
 * POST Middleware - Handle each Y/N answer.
 * Conditionally render next question or a notice.
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
var postStage = exports.postStage = function postStage(req, res) {
  // Name of the stage being posted
  var stageName = (0, _getLastInUrl.getLastInUrl)(req);
  // Get submitted values for answer
  var formData = req.body;
  var answer = formData[stageName];
  var errors = req.session.viewData.questions["".concat(stageName)].errors[0];

  // If there were errors in the session, return to question
  if (errors) {
    return res.redirect("/prototypes/vts-changes/".concat(stageName));
  }

  // Add submktted answers to session
  req.session.viewData.questions["".concat(stageName)].answer = formData;

  // Check stage for the 'correct' answer, and redirect to next stage or show a Notice
  switch (stageName) {
    case 'approved':
      // If 'no', render notice
      if (answer === 'no') {
        return res.redirect('/prototypes/vts-changes/unapproved-notice');
      }
      // If 'yes', direct to next question
      return res.redirect('/prototypes/vts-changes/layout');
      break;
    case 'layout':
      // If 'yes', render notice
      if (answer === 'yes') {
        return res.redirect('/prototypes/vts-changes/change-notice');
      }
      // If 'no', direct to next question
      return res.redirect('/prototypes/vts-changes/classes');
      break;
    case 'classes':
      console.log(req.session.viewData.version);
      // If 'yes', render notice
      if (answer === 'no') {
        return res.redirect('/prototypes/vts-changes/change-notice');
      }
      // if a specific prototype, show the short summary page
      if (req.session.viewData.version == '2') {
        return res.redirect('/prototypes/vts-changes/short-summary');
      }
      // if yes, go to summary
      return res.redirect('/prototypes/vts-changes/summary');
      break;
    default:
      break;
  }
};

/**
 * GET Middleware - Render Y/N questions
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
var getStage = exports.getStage = function getStage(req, res) {
  req.session.viewData = req.session.viewData || (0, _initChangeData.initViewData)();
  console.log(req.params);
  var stageName = (0, _getLastInUrl.getLastInUrl)(req);
  return res.render("./prototypes/vts-changes/".concat(stageName, "/index"), {
    viewData: req.session.viewData
  });
};

/**
 * GET Middleware - Render confirmation
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
var getConfirmation = exports.getConfirmation = function getConfirmation(req, res) {
  return res.render('./prototypes/vts-changes/confirmation/index');
};