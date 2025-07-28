"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetMessages = exports.rejectMessage = exports.getMessages = exports.getMessage = exports.getHomepage = exports.getArchive = exports.archiveMessage = exports.acknowledgeMessage = exports.acceptMessage = void 0;
/**
 * GET Middleware - Renders homepage view with messages data
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
const getHomepage = (req, res) => {
  return res.render('prototypes/messages/homepage/index', {
    viewData: req.session.viewData
  });
};

/**
 * GET Middleware - Renders multiple messages view with messages data
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
exports.getHomepage = getHomepage;
const getMessages = (req, res) => {
  // Renders the messaging index view
  return res.render(`prototypes/messages/inbox/index`, {
    viewData: req.session.viewData,
    flashMessage: req.flash('flash-message')
  });
};

/**
 * GET Middleware - Renders multiple messages view with messages data
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
exports.getMessages = getMessages;
const getArchive = (req, res) => {
  // Renders the messaging archived view
  return res.render(`prototypes/messages/archive/index`, {
    viewData: req.session.viewData,
    flashMessage: req.flash('flash-message')
  });
};

/**
 * GET Middleware - Renders view for a single message with message data
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
exports.getArchive = getArchive;
const getMessage = (req, res) => {
  if (req.message.type === 'News') {
    req.message.state.accepted = true;
    req.message.state.rejected = true;
  }

  // Set the message's isRead state to true
  req.message.state.isRead = true;
  // Navigate to message view
  return res.render('prototypes/messages/view/index', {
    viewData: req.message
  });
};

/**
 * GET Middleware - Updates a message's acknowledged state
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 * @param {Express.Response} next - Express next object
 */
exports.getMessage = getMessage;
const acknowledgeMessage = (req, res, next) => {
  // Message acknowledge state is set to true
  req.message.state.acknowledged = true;

  // Creates success flash message
  req.flash('flash-message', `${req.message.type} successfully acknowledged.`);

  // Redirect to messages dashboard
  return res.redirect('/prototypes/messages/inbox/');
};

/**
 * GET Middleware - Sets a message to be accepted
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 * @param {Express.Response} next - Express next object
 */
exports.acknowledgeMessage = acknowledgeMessage;
const acceptMessage = (req, res, next) => {
  req.message.state.accepted = true;
  req.message.state.rejected = false;
  // Creates success flash message
  req.flash('flash-message', `${req.message.type} successfully accepted.`);
  // Redirect to messages dashboard
  return res.redirect('/prototypes/messages/inbox/');
};

/**
 * GET Middleware - Sets a message to be rejected
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 * @param {Express.Response} next - Express next object
 */
exports.acceptMessage = acceptMessage;
const rejectMessage = (req, res, next) => {
  // Set message as rejected
  req.message.state.accepted = false;
  req.message.state.rejected = true;

  // Creates success flash message
  req.flash('flash-message', `${req.message.type} successfully rejected.`);

  // Redirect to messages dashboard
  return res.redirect('/prototypes/messages/inbox/');
};

/**
 * GET Middleware - Archives a message
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 * @param {Express.Response} next - Express next object
 */
exports.rejectMessage = rejectMessage;
const archiveMessage = (req, res, next) => {
  // Helper variables
  const messageData = req.session.viewData.messages;
  const archiveData = req.session.viewData.archive;
  req.message.state.isArchived = true;

  // Splices the message from session.messages
  messageData.splice(req.message.id, 1);

  // Appends to session.archive
  archiveData.push(req.message);

  // Creates success flash message
  req.flash('flash-message', `${req.message.type} successfully archived.`);

  // Redirect to messages dashboard
  return res.redirect('/prototypes/messages/inbox/');
};

/**
 * GET Middleware - Resets viewData messages
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 * @param {Express.Response} next - Express next object
 */
exports.archiveMessage = archiveMessage;
const resetMessages = (req, res, next) => {
  // If session viewData is set
  if (req.session.viewData) {
    // unset it
    req.session.viewData = null;
  }

  // Render view
  return res.render('prototypes/mts-messages/index');
};
exports.resetMessages = resetMessages;