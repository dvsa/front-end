import { addToSession } from '../speech-to-text-search/helpers/add-to-session.js';
import { initViewData } from './initViewData.js';
import { getLastInUrl } from './helpers/getLastInUrl.js';
import { nextTick } from 'q';

//export * from './validators/validation.js';

/**
 * GET request middleware - clears session
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
export const getStart = (req, res) => {
  // Resets session data if doesn't exist
  req.session.viewData = req.session.viewData || initViewData();
  console.log('init data');
  console.log(req.session.viewData);
  return res.render('./prototypes/compare-tests/v7/start', { viewData: req.session.viewData });
};

export const getOverview = (req, res) => {
  // Resets session data if doesn't exist
  req.session.viewData = req.session.viewData || initViewData();
  console.log(req.session.viewData);
  return res.render('./prototypes/compare-tests/v7/overview', { viewData: req.session.viewData });
};


export const getSummary = (req, res) => {
  console.log(req.session.viewData);
  console.log('summary')
  return res.render('./prototypes/compare-tests/v7/case-summary', { viewData: req.session.viewData });
};


export const getDifference = (req, res) => {
  console.log(req.session.viewData);
  console.log(req.query.defectIndex);
  req.session.viewData.defectIndex = req.query.defectIndex;
  return res.render('./prototypes/compare-tests/v7/assess-difference', { viewData: req.session.viewData });
};

export const postDifference = (req, res) => {
  req.session.viewData.defectIndex = req.query.defectIndex;
  return res.redirect('./prototypes/compare-tests/v7/overview');
};

export const checkCompletion = (req, res, next) => {
  req.session.viewData.allComplete = Array.from(req.session.viewData.defects).every(defect => defect.isResolved);
  console.log(req.session.viewData);
  next();
};

export const getDifference1 = (req, res) => {
  // Resets session data if doesn't exist
  req.session.viewData = req.session.viewData || initViewData();
  return res.render('./prototypes/compare-tests/v7/assess-difference-1', { viewData: req.session.viewData });
};

export const getDifference2 = (req, res) => {
  // Resets session data if doesn't exist
  req.session.viewData = req.session.viewData || initViewData();
  console.log(req.session.viewData);
  return res.render('./prototypes/compare-tests/v7/assess-difference-2', { viewData: req.session.viewData });
};

export const getDifference3 = (req, res) => {
  // Resets session data if doesn't exist
  req.session.viewData = req.session.viewData || initViewData();
  console.log(req.session.viewData);
  return res.render('./prototypes/compare-tests/v7/assess-difference-3', { viewData: req.session.viewData });
};
