/**
 * filterUnreadNews - Filters for actioned notifications
 *
 * @param {message} Object - Object containing message info
 * @returns {Object} message - Message object
 */
export const filterUnactionedNotification = message => {
  if (message.type === 'Notification' && !message.state.accepted && !message.state.rejected) {
    return message;
  }
};

/**
 * filterUnreadNews - Filters for unread news notifications
 *
 * @param {message} Object - Object containing message info
 * @returns {Object} message - Message object
 */
export const filterUnreadNews = message => {
  if (message.type === 'News' && !message.state.isRead) {
    return message;
  }
};

/**
 * filterPinned - Filters for pinned messages
 *
 * @param {message} Object - Object containing message info
 * @returns {Object} message - Message object
 */
export const filterPinned = message => message.state.isPinned;
