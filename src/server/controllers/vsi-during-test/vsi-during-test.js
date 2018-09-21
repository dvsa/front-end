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
  console.log('posted odometer');
  return res.redirect('/prototypes/vsi-during-test/inspection/inspection-4');
};

/**
 * GET Middleware - Initialise session for Stage 1
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
export const getInspectionWithOdometer = (req, res) => {
  req.session.viewData = req.body || initData();
  console.log('get inspection 4');
  return res.render('./prototypes/vsi-during-test/inspection/inspection-4', { viewData: req.session.viewData });
};
