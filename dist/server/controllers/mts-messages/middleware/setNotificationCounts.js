"use strict";

require("core-js/modules/esnext.weak-map.delete-all.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setNotificationCounts = void 0;
var filters = _interopRequireWildcard(require("../helpers/filters"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const setNotificationCounts = (req, res, next) => {
  const viewData = req.session.viewData;
  const messages = req.session.viewData.messages;
  viewData.isPinnedCount = messages.filter(filters.filterPinned).length;
  viewData.isActionedCount = messages.filter(filters.filterUnactionedNotification).length;
  viewData.isNewsCount = messages.filter(filters.filterUnreadNews).length;
  next();
};
exports.setNotificationCounts = setNotificationCounts;