'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * GET Middleware - Renders multiple messages view with messages data
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
const getMessages = exports.getMessages = (req, res) => {
  // Renders the messaging index view
  return res.render(`prototypes/messages/inbox/index`, { viewData: req.session.viewData, flashMessage: req.flash('flash-message') });
};

/**
 * GET Middleware - Renders multiple messages view with messages data
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
const getArchive = exports.getArchive = (req, res) => {
  // Renders the messaging archived view
  return res.render(`prototypes/messages/archive/index`, { viewData: req.session.viewData, flashMessage: req.flash('flash-message') });
};

/**
 * GET Middleware - Renders view for a single message with message data
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
const getMessage = exports.getMessage = (req, res) => {
  // Set the message's isRead state to true
  req.message.state.isRead = true;
  // Navigate to message view
  return res.render('prototypes/messages/view/index', { viewData: req.message });
};

/**
 * GET Middleware - Updates a message's acknowledged state
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 * @param {Express.Response} next - Express next object
 */
const acknowledgeMessage = exports.acknowledgeMessage = (req, res, next) => {
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
const acceptMessage = exports.acceptMessage = (req, res, next) => {
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
const rejectMessage = exports.rejectMessage = (req, res, next) => {
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
const archiveMessage = exports.archiveMessage = (req, res, next) => {
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
const resetMessages = exports.resetMessages = (req, res, next) => {
  // If session viewData is set
  if (req.session.viewData) {
    // unset it
    req.session.viewData = null;
  }

  // Render view
  return res.render('prototypes/mts-messages/index');
};