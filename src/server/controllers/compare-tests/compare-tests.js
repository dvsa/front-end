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
  return res.render('./prototypes/compare-tests/v7/start');
};

export const getOverview = (req, res) => {
  // Resets session data if doesn't exist
  req.session.viewData = req.session.viewData || initViewData(); 
  console.log(req.session.viewData.defects);
  return res.render('./prototypes/compare-tests/v7/overview', { viewData: req.session.viewData });
};

export const getRecordOutcome = (req, res) => {
  const scores = Array.from(req.session.viewData.defects).map( defect => parseInt(defect.points, 10) )
  const sumOfPoints = scores.reduce(( running, a) => running + a); 
  console.log(scores);
  console.log(sumOfPoints);
  req.session.viewData.score = sumOfPoints;
  return res.render('./prototypes/compare-tests/v7/record-outcome', { viewData: req.session.viewData });
};

export const getDifference = (req, res) => { 
  console.log(req.params.defectIndex);
  console.log(req.session.viewData);
  req.session.viewData.defectIndex = req.params.defectIndex;
  return res.render('./prototypes/compare-tests/v7/assess-difference', { viewData: req.session.viewData });
};

export const checkCompletion = (req, res, next) => {
  // Mark defect as resolved
  const currentDefect = req.params.defectIndex;
  console.log(currentDefect)
  req.session.viewData.defects[currentDefect].isResolved = true;

  // Check if all defects are complete and set if true
  const allComplete = Array.from(req.session.viewData.defects).every(defect => defect.isResolved);
  req.session.viewData.allComplete = allComplete;
  console.log(allComplete);
  next();
};

export const postDifference = (req, res) => {
  console.log('post difference')
  const currentDefect = req.params.defectIndex;
  // Set form congtents into Viewdata
  req.session.viewData.defects[currentDefect].isResolved = true;
  req.session.viewData.defects[currentDefect].points = req.body.decision;
  req.session.viewData.defects[currentDefect].comment = req.body.justification;
  return res.redirect('/prototypes/compare-tests/v7/overview');
};
/* 
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
 */