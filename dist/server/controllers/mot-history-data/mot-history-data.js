'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postV5c = exports.getError = exports.checkV5c = exports.initViewData = undefined;

var _initData = require('./initData.js');

var _helpers = require('../vts-changes/helpers/helpers.js');

const validV5c = '12345';

const initViewData = exports.initViewData = (req, res, next) => {
  req.session.viewData = req.session.viewData || (0, _initData.initData)();
  req.session.viewData.targetCert = 'pass';
  console.log('init view data');
  console.log(req.session.viewData);
  if (req.query.cert == 'fail') {
    req.session.viewData.targetCert = 'fail';
  }
  next();
};

const checkV5c = exports.checkV5c = (req, res, next) => {
  req.session.viewData.invalid = false;
  if (req.body.v5c !== validV5c) {
    req.session.viewData.invalid = true;
  }
  next();
};

const getError = exports.getError = (req, res) => {
  let version = req.session.viewData.version;
  let targetCert = req.session.viewData.targetCert;
  // Version 3 only
  if (version.indexOf('3') !== -1 && targetCert == 'pass') {
    req.session.viewData.targetCert = 'pass';
    console.log(req.session.viewData);
    return res.render(`prototypes/mot-history-data/${version}/history-results-audi-error1`, { viewData: req.session.viewData });
  }
  return res.render(`prototypes/mot-history-data/${version}/enter-v5c-error`, { viewData: req.session.viewData });
};

const postV5c = exports.postV5c = (req, res, next) => {
  let version = req.params.version;
  let v5c = req.body.v5c;
  let targetCert = req.session.viewData.targetCert;

  console.log('body', req.body);

  req.session.viewData.v5c = v5c;
  req.session.viewData.version = version;

  // Versions 1 and 2. Post to Error view.
  if (req.session.viewData.invalid && version.indexOf('3') == -1) {
    return res.redirect(`/prototypes/mot-history-data/${version}/enter-v5c-error`);
  }

  if (targetCert !== 'fail' && version.indexOf('3') == -1) {
    return res.redirect(`/prototypes/mot-history-data/${version}/download-certificate`);
  }

  // Version 3 
  if (version.indexOf('3') !== -1) {

    // ...and has error
    if (req.session.viewData.invalid) {
      req.session.viewData.v5c = req.body.v5c;
      req.session.viewData.targetCert = 'pass';
      console.log('redirecting to audi error1');
      console.log(req.session.viewData.targetCert);
      return res.redirect(`/prototypes/mot-history-data/${version}/history-results-audi-error1`);
    }
    // Get pass/fail results
    if (req.query.targetCert === 'fail') {
      return res.redirect(`/prototypes/mot-history-data/${version}/download-certificate-fail`);
    }
    return res.redirect(`/prototypes/mot-history-data/${version}/download-certificate`);
  }

  // Version 1 and 2 download fail cert
  return res.redirect(`/prototypes/mot-history-data/${version}/download-certificate-fail`);
};