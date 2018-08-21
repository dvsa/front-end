/**
 * GET Middleware - Renders multiple messages view with messages data
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
export const getMessages = (req, res) => {
  // Renders the messaging index view
  return res.render(`prototypes/messaging/index`, { viewData: req.session.viewData, flashMessage: req.flash('flash-message') });
};

/**
 * GET Middleware - Renders multiple messages view with messages data
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
export const getArchive = (req, res) => {
  // Renders the messaging archived view
  return res.render(`prototypes/messaging/archive/index`, { viewData: req.session.viewData, flashMessage: req.flash('flash-message') });
};

/**
 * GET Middleware - Renders view for a single message with message data
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
export const getMessage = (req, res) => {
  // Set the message's isRead state to true
  req.message.state.isRead = true;
  console.log(req.message.state);
  // Navigate to message view
  return res.render('prototypes/messaging/view/index', { viewData: req.message });
};

/**
 * GET Middleware - Updates a message's acknowledged state
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 * @param {Express.Response} next - Express next object
 */
export const acknowledgeMessage = (req, res, next) => {
  // Message acknowledge state is set to true
  req.message.state.acknowledged = true;

  // Creates success flash message
  req.flash('flash-message', `${req.message.type} successfully acknowledged.`);

  // Redirect to messages dashboard
  return res.redirect('/prototypes/messaging/');
};

/**
 * GET Middleware - Sets a message to be accepted
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 * @param {Express.Response} next - Express next object
 */
export const acceptMessage = (req, res, next) => {
  req.message.state.accepted = true;
  req.message.state.rejected = false;
  // Creates success flash message
  req.flash('flash-message', `${req.message.type} successfully accepted.`);
  console.log(req.message);
  // Redirect to messages dashboard
  return res.redirect('/prototypes/messaging/');
};

/**
 * GET Middleware - Sets a message to be rejected
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 * @param {Express.Response} next - Express next object
 */
export const rejectMessage = (req, res, next) => {
  // Set message as rejected
  req.message.state.accepted = false;
  req.message.state.rejected = true;

  // Creates success flash message
  req.flash('flash-message', `${req.message.type} successfully rejected.`);

  // Redirect to messages dashboard
  return res.redirect('/prototypes/messaging/');
};

/**
 * GET Middleware - Sets a message to archive
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 * @param {Express.Response} next - Express next object
 */
export const archiveMessage = (req, res, next) => {
  const messageId = req.message.id;
  const viewData = req.session.viewData;

  // Reference new archive from existing archive
  const currentArchive = viewData.archive;

  // Message to be archived
  const archivedMessage = req.message;

  // Get current message, set to archived state
  //const archivedMessage = viewData.messages.filter(message => message.id == messageId);
  archivedMessage.isArchived = true;

  // Take message out of Messages array
  const updatedMessages = viewData.messages.filter(message => message.id !== messageId);

  // Add message to a new Archive array
  const updatedArchive = currentArchive.concat(archivedMessage);

  // Update viewdata with new messages arrays
  req.session.viewData.archive = updatedArchive;
  req.session.viewData.messages = updatedMessages;

  // Creates success flash message
  req.flash('flash-message', `${req.message.type} successfully archived.`);
 
  // Redirect to messages dashboard
  return res.redirect('/prototypes/messaging/');
}; 
