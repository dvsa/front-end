/**
 * GET Middleware - Checks to see if message exists in messages array
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 * @param {Express.Response} next - Express next object
 * @param {Int} messageID - Message ID number
 */
export const isValidMessage = (req, res, next, messageID) => {
  // If messages on req.session.viewData non existent or message
  // does not exist
  if (!req.session.viewData.messages || !req.session.viewData.messages[messageID]) {
    // redirect back to messaging view
    return res.redirect('/prototypes/messaging/');
  }

  // Attatches message to req.message
  req.message = req.session.viewData.messages[messageID];

  // Run next middleware stack
  next();
};
