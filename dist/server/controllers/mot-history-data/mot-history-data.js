"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postV5c = exports.initViewData = exports.getError = exports.checkV5c = void 0;
var _initData = require("./initData.js");
var _helpers = require("../vts-changes/helpers/helpers.js");
var validV5c = '61943311568';
var initViewData = exports.initViewData = function initViewData(req, res, next) {
  req.session.viewData = req.session.viewData || (0, _initData.initData)();
  req.session.viewData.targetCert = 'pass';
  console.log('init view data');
  if (req.query.cert == 'fail') {
    req.session.viewData.targetCert = 'fail';
  }
  next();
};
var checkV5c = exports.checkV5c = function checkV5c(req, res, next) {
  req.session.viewData.invalid = false;
  if (req.body.v5c !== validV5c) {
    req.session.viewData.invalid = true;
  }
  next();
};
var getError = exports.getError = function getError(req, res) {
  var version = req.session.viewData.version;
  var targetCert = req.session.viewData.targetCert;
  // Version 3 only
  if (version.indexOf('3') !== -1 && targetCert == 'pass') {
    req.session.viewData.targetCert = 'pass';
    return res.render("prototypes/mot-history-data/".concat(version, "/history-results-audi-error1"), {
      viewData: req.session.viewData
    });
  } else if (targetCert == 'fail') {
    return res.render("prototypes/mot-history-data/".concat(version, "/history-results-audi-error2"), {
      viewData: req.session.viewData
    });
  }
  return res.render("prototypes/mot-history-data/".concat(version, "/enter-v5c-error"), {
    viewData: req.session.viewData
  });
};
var postV5c = exports.postV5c = function postV5c(req, res, next) {
  var version = req.params.version;
  var v5c = req.body.v5c;
  var targetCert = req.session.viewData.targetCert;
  req.session.viewData.v5c = v5c;
  req.session.viewData.version = version;

  // Versions 1 and 2. Post to Error view.
  if (req.session.viewData.invalid && version.indexOf('3') == -1) {
    return res.redirect("/prototypes/mot-history-data/".concat(version, "/enter-v5c-error"));
  }
  if (targetCert !== 'fail' && version.indexOf('3') == -1) {
    return res.redirect("/prototypes/mot-history-data/".concat(version, "/download-certificate"));
  }

  // Version 3
  if (version.indexOf('3') !== -1) {
    // ...and has error
    if (req.session.viewData.invalid) {
      req.session.viewData.v5c = req.body.v5c;
      var _targetCert = req.query.targetCert;
      req.session.viewData.targetCert = _targetCert;
      if (_targetCert !== 'pass') {
        return res.redirect("/prototypes/mot-history-data/".concat(version, "/history-results-audi-error2"));
      }
      return res.redirect("/prototypes/mot-history-data/".concat(version, "/history-results-audi-error1"));
    }

    // Get pass/fail results
    if (req.query.targetCert === 'fail') {
      return res.redirect("/prototypes/mot-history-data/".concat(version, "/download-certificate-fail"));
    }
    return res.redirect("/prototypes/mot-history-data/".concat(version, "/download-certificate"));
  }

  // Version 1 and 2 download fail cert
  return res.redirect("/prototypes/mot-history-data/".concat(version, "/download-certificate-fail"));
};