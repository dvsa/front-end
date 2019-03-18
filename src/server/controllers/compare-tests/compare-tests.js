import { addToSession } from '../speech-to-text-search/helpers/add-to-session.js';
import { initViewData } from './initViewData.js';
import { getLastInUrl } from './helpers/getLastInUrl.js';

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
  return res.render('./prototypes/compare-tests/demo/start', { viewData: req.session.viewData });
};

export const getOverview = (req, res) => {
  // Resets session data if doesn't exist
  req.session.viewData = req.session.viewData || initViewData();
  console.log(req.session.viewData)
  return res.render('./prototypes/compare-tests/demo/overview', { viewData: req.session.viewData });
};
