import { initData } from './initData.js';
import { isEmpty } from '../vts-changes/helpers/helpers.js';

export const initViewData = (req, res, next) => {
  req.session.viewData = req.session.viewData || initData();
  req.session.viewData.targetCert = 'pass';
  if(req.query.cert == 'fail' ){
    req.session.viewData.targetCert = 'fail';
  }
  next();
};

const validV5c = '12345';

export const checkV5c = (req, res, next) => {
  req.session.viewData.invalid = false;
  if ( req.body.v5c !== validV5c) {
    req.session.viewData.invalid = true;
  }
  next();
};

export const getError = (req, res) => {
  let version = req.params.version;
  console.log(req.session.viewData)
  return res.render(`prototypes/mot-history-data/${version}/enter-v5c-error`, { viewData: req.session.viewData });
}

export const postV5c = (req, res, next) => {
  req.session.viewData.v5c = req.body.v5c;
  let version = req.params.version;

  if (req.session.viewData.invalid) { 
    req.session.viewData.v5c = req.body.v5c;
    return res.redirect(`/prototypes/mot-history-data/${version}/enter-v5c-error`);
  }
  console.log(req.session.targetCert)
  if (req.session.viewData.targetCert !== 'fail'){
    return res.render(`prototypes/mot-history-data/${version}/download-certificate`, { viewData: req.session.viewData });
  }
  return res.render(`prototypes/mot-history-data/${version}/download-certificate-fail`, { viewData: req.session.viewData });

};