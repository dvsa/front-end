import { initData } from './initData.js';
import { isEmpty } from '../vts-changes/helpers/helpers.js';

/**
 * POST Middleware - Take inputted odometer reading and persist on inspection sheet #4
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
export const postOdometer = (req, res) => {
  req.session.viewData = req.body || initData();
  return res.redirect('/prototypes/vsi-during-test/inspection/inspection-4');
};

/**
 * GET Middleware - Pick up GET from redirect on POSTing odometer
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
export const getInspectionWithOdometer = (req, res) => {
  return res.render('./prototypes/vsi-during-test/inspection/inspection-4', { viewData: req.session.viewData });
};

/**
 * GET Middleware - Persist entered odometer reading when returning to /odometer
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
export const getOdometer = (req, res) => {
  req.session.viewData = req.session.viewData || initData();
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
  const fullPreviousUrl = req.header('Referer');
  let backButton = '/' + fullPreviousUrl.substring(fullPreviousUrl.indexOf('/prototypes') + 1);
  return res.render('prototypes/vsi-during-test/advice/index', { viewData: { backButton } });
};
