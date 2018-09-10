import * as filters from '../helpers/filters';

export const setNotificationCounts = (req, res, next) => {
  const viewData = req.session.viewData;
  const messages = req.session.viewData.messages;

  viewData.isPinnedCount = messages.filter(filters.filterPinned).length;
  viewData.isActionedCount = messages.filter(filters.filterUnactionedNotification).length;
  viewData.isNewsCount = messages.filter(filters.filterUnreadNews).length;

  next();
};
