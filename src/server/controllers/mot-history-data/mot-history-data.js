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

export const postV5c = (req, res, next) => {
  console.log(req.session.viewData)
  return res.render('prototypes/mot-history-data/cvs/download-certificate', { viewData: req.session.viewData });
};
 
 
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