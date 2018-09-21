import { initData } from './initData.js';
import { isEmpty } from '../vts-changes/helpers/helpers.js';

/**
 * POST Middleware - Initialise session for Stage 1
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
export const postOdometer = (req, res) => {
  req.session.viewData = req.body || initData();
  return res.redirect('/prototypes/vsi-during-test/inspection');
};

/**
 * GET Middleware - Initialise session for Stage 1
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
export const getMotInspection = (req, res) => {
  req.session.viewData = req.session.viewData || initData();
  return res.render('./prototypes/vsi-during-test/inspection/index', { viewData: req.session.viewData });
};
