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
var filterUnactionedNotification = exports.filterUnactionedNotification = function filterUnactionedNotification(message) {
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
var filterUnreadNews = exports.filterUnreadNews = function filterUnreadNews(message) {
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
var filterPinned = exports.filterPinned = function filterPinned(message) {
  return message.state.isPinned;
};