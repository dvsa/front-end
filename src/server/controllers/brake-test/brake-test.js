/**
 * POST request middleware - On post to brake test config, direct to enter details
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
export const postBrakeConfig = (req, res) => {
  // Redirect to enter brake test details
  return res.redirect('/prototypes/brake-test-entry/');
};
