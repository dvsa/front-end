'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * POST request middleware - On post to brake test config, direct to enter details
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
const postBrakeConfig = exports.postBrakeConfig = (req, res) => {
  // Redirect to enter brake test details
  return res.redirect('/prototypes/brake-test-entry');
};

/**
 * POST request middleware - On post to brake test entries, direct to summary
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
const postBrakeEntry = exports.postBrakeEntry = (req, res) => {
  // Redirect to enter brake test details
  return res.redirect('/prototypes/brake-test-summary');
};