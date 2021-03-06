/**
 * GET Middleware - unpins special notice
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 * @param {Express.Response} next - Express next object
 */
export const unpinSpecialNotice = (req, res, next) => {
  // unpins message
  req.message.state.isPinned = false;

  // updates isPinnedCount
  req.session.viewData.isPinnedCount = req.session.viewData.isPinnedCount - 1;

  // Calls next middleware method
  next();
};
