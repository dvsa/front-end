/**
 * GET Middleware - Checks to see if message exists in archive array
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 * @param {Express.Response} next - Express next object
 * @param {Int} messageID - Message ID number
 */
export const isValidArchMessage = (req, res, next, messageID) => {
  // If messages on req.session.viewData non existent or message
  // does not exist in archive
  if (!req.session.viewData.archive || !req.session.viewData.archive[messageID]) {
    // redirect back to messaging view
    return res.redirect('/prototypes/messaging/');
  }

  // Attached message to req.message
  req.message = req.session.viewData.archive[messageID];

  // Run next middleware stack
  next();
};
