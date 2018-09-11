'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setNotificationCounts = undefined;

var _filters = require('../helpers/filters');

var filters = _interopRequireWildcard(_filters);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

const setNotificationCounts = exports.setNotificationCounts = (req, res, next) => {
  const viewData = req.session.viewData;
  const messages = req.session.viewData.messages;

  viewData.isPinnedCount = messages.filter(filters.filterPinned).length;
  viewData.isActionedCount = messages.filter(filters.filterUnactionedNotification).length;
  viewData.isNewsCount = messages.filter(filters.filterUnreadNews).length;

  next();
};