import { initData } from './initData.js';
import { isEmpty } from '../vts-changes/helpers/helpers.js';
const validV5c = '12345';

export const initViewData = (req, res, next) => {
  req.session.viewData = req.session.viewData || initData();
  req.session.viewData.targetCert = 'pass';
  console.log('init view data');
  if (req.query.cert == 'fail') {
    req.session.viewData.targetCert = 'fail';
  }
  next();
};

export const checkV5c = (req, res, next) => {
  req.session.viewData.invalid = false;
  if (req.body.v5c !== validV5c) {
    req.session.viewData.invalid = true;
  }
  next();
};

export const getError = (req, res) => {
  let version = req.params.version;
  console.log(req.session.viewData);
  return res.render(`prototypes/mot-history-data/${version}/enter-v5c-error`, { viewData: req.session.viewData });
};

export const postV5c = (req, res, next) => {
  let version = req.params.version;
  let v5c = req.body.v5c;
  let targetCert = req.session.viewData.targetCert;

  req.session.viewData.v5c = v5c;
  req.session.viewData.version = version;

  if (req.session.viewData.invalid && version.indexOf('3') == -1) {
    return res.redirect(`/prototypes/mot-history-data/${version}/enter-v5c-error`);
  }

  if (targetCert !== 'fail') {
    return res.redirect(`/prototypes/mot-history-data/${version}/download-certificate`);
  }

  // Version 3, with error
  if (version.indexOf('3') !== -1 && req.session.viewData.invalid) {
    return res.redirect(`/prototypes/mot-history-data/cvs-v3/history-results-audi`);
  }

  // Version 1 and 2 download fail cert
  return res.redirect(`/prototypes/mot-history-data/${version}/download-certificate-fail`);
};
