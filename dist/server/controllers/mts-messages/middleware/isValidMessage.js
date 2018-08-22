'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * GET Middleware - Checks to see if message exists in messages array
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 * @param {Express.Response} next - Express next object
 * @param {Int} messageID - Message ID number
 */
const isValidMessage = exports.isValidMessage = (req, res, next, messageID) => {
  // Helper variables
  const messages = req.session.viewData.messages;
  const archive = req.session.viewData.archive;

  // Finds message in either inbox or archive (Can only find one)
  const inboxMsg = messages.find(msg => msg.id == messageID);
  const archiveMsg = archive.find(msg => msg.id == messageID);

  // If message not found
  if (!inboxMsg && !archiveMsg) {
    return res.redirect('/prototypes/messaging/');
  }

  // req.message equals either inboxMessage or archiveMessage
  req.message = inboxMsg || archiveMsg;

  // Run next middleware stack
  next();
};