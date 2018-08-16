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
  // Set message as accepeted
  req.message.state.accepeted = false;
  req.message.state.rejected = true;

  // Creates success flash message
  req.flash('flash-message', `${req.message.type} successfully accepted.`);

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
  req.messge.state.accepeted = false;
  req.message.state.rejected = true;

  // Creates success flash message
  req.flash('flash-message', `${req.message.type} successfully rejected.`);

  // Redirect to messages dashboard
  return res.redirect('/prototypes/messaging/');
};
