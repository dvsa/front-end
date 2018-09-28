import { initData } from './initData.js';
import { isEmpty } from '../vts-changes/helpers/helpers.js';

export const initViewData = (req, res, next) => {
  req.session.viewData = req.session.viewData || initData();
  next();
};

export const getPrevUrl = (req, res, next) => {
  const fullPreviousUrl = req.header('Referer');
  req.session.viewData = req.session.viewData || initData();
  req.session.viewData.prevUrl = '/' + fullPreviousUrl.substring(fullPreviousUrl.indexOf('/prototypes') + 1);
  next();
};

export const getInspection1 = (req, res) => {
  return res.render('prototypes/vsi-during-test/inspection/index', { viewData: req.session.viewData });
};

export const getInspection2 = (req, res) => {
  return res.render('prototypes/vsi-during-test/inspection/inspection-2', { viewData: req.session.viewData });
};

export const getInspection3 = (req, res) => {
  return res.render('prototypes/vsi-during-test/inspection/inspection-3', { viewData: req.session.viewData });
};

export const getInspection4 = (req, res) => {
  return res.render('prototypes/vsi-during-test/inspection/inspection-4', { viewData: req.session.viewData });
};

export const getInspection5 = (req, res) => {
  return res.render('prototypes/vsi-during-test/inspection/inspection-5', { viewData: req.session.viewData });
};

export const getSummary = (req, res) => {
  return res.render('prototypes/vsi-during-test/summary/index', { viewData: req.session.viewData });
};

export const getSummary = (req,res) => {
  return res.render('prototypes/vsi-during-test/summary/index',  { viewData: req.session.viewData })
}

/**
 * POST Middleware - Take inputted odometer reading and persist on inspection sheet #4
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
export const postOdometer = (req, res) => {
  req.session.viewData.odometer = req.body.odometer;
  return res.redirect(`${req.session.viewData.prevUrl}`);
};

/**
 * GET Middleware - Persist entered odometer reading when returning to /odometer
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
export const getOdometer = (req, res) => {
  return res.render('./prototypes/vsi-during-test/odometer/index', { viewData: req.session.viewData });
};

/**
 * GET Middleware - Persist entered odometer reading when returning to /odometer
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
export const postBrakes = (req, res) => {
  req.session.viewData = req.session.viewData || initData();
  return res.render('./prototypes/vsi-during-test/inspection/inspection-4', { viewData: req.session.viewData });
};

export const getAdvice = (req, res) => {
  req.session.viewData = req.session.viewData || initData();
  return res.render('prototypes/vsi-during-test/advice/index', { viewData: req.session.viewData });
};