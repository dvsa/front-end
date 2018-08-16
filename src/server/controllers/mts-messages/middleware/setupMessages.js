// Gets message data object
import { data } from '../data';
import { archiveData } from '../archiveData';

/**
 * addPinnedItems - Adds is pinned state to special notices
 *
 * @param {message} Object - Object containing message info
 * @returns {Object} message - Message object
 */
const addPinnedItems = message => {
  // If message is a special notice and is not currently acknowledged
  if (message.type == 'Special notice' && message.state.acknowledged == false) {
    // Set message state to isPinned
    message.state.isPinned = true;
  }

  // return message
  return message;
};

/**
 * filterPinned - Filters for pinned messages
 *
 * @param {message} Object - Object containing message info
 * @returns {Object} message - Message object
 */
const filterPinned = message => message.state.isPinned;

/**
 * addIndices - Updates messages objects indicies
 *
 * @param {message} Object - Object containing message info
 * @returns {Object} message - Message object
 */
const addIndices = (message, index) => {
  // Adds ID to message
  message.id = index;

  // return message
  return message;
};

/**
 * GET Middleware - Sets messages to req.session if non existent
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 * @param {Express.Response} next - Express next object
 */
export const setupMessages = (req, res, next) => {
  console.log('test');
  // if viewData already exists return to next middleware method
  if (req.session.viewData) return next();

  // Adds pinned items, adds indices
  const updatedData = data.map(addPinnedItems).map(addIndices);

  // Set up some archive messages
  const updatedArchive = archiveData.map(addPinnedItems).map(addIndices);
 

  // Setup viewData
  const viewData = {
    messages: updatedData,
    archive: updatedArchive,
    isPinnedCount: updatedData.filter(filterPinned).length,
  };

  // Set session viewData
  req.session.viewData = viewData;

  // Run next middleware stack
  next();
};
