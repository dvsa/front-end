"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isValidMessage = void 0;
/**
 * GET Middleware - Checks to see if message exists in messages array
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 * @param {Express.Response} next - Express next object
 * @param {Int} messageID - Message ID number
 */
var isValidMessage = exports.isValidMessage = function isValidMessage(req, res, next, messageID) {
  // Helper variables
  var messages = req.session.viewData.messages;
  var archive = req.session.viewData.archive;

  // Finds message in either inbox or archive (Can only find one)
  var inboxMsg = messages.find(function (msg) {
    return msg.id == messageID;
  });
  var archiveMsg = archive.find(function (msg) {
    return msg.id == messageID;
  });

  // If message not found
  if (!inboxMsg && !archiveMsg) {
    return res.redirect('/prototypes/messaging/received');
  }

  // req.message equals either inboxMessage or archiveMessage
  req.message = inboxMsg || archiveMsg;

  // Run next middleware stack
  next();
};