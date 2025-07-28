"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterUnreadNews = exports.filterUnactionedNotification = exports.filterPinned = void 0;
/**
 * filterUnreadNews - Filters for actioned notifications
 *
 * @param {message} Object - Object containing message info
 * @returns {Object} message - Message object
 */
const filterUnactionedNotification = message => {
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
exports.filterUnactionedNotification = filterUnactionedNotification;
const filterUnreadNews = message => {
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
exports.filterUnreadNews = filterUnreadNews;
const filterPinned = message => message.state.isPinned;
exports.filterPinned = filterPinned;