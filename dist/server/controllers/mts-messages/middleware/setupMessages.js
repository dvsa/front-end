"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupMessages = void 0;
var _data = require("../data");
var filters = _interopRequireWildcard(require("../helpers/filters"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
// Gets message data object

/**
 * addPinnedItems - Adds is pinned state to special notices
 *
 * @param {message} Object - Object containing message info
 * @returns {Object} message - Message object
 */
var addPinnedItems = function addPinnedItems(message) {
  // If message is a special notice and is not currently acknowledged
  if (message.type == 'Special notice' && message.state.acknowledged == false) {
    // Set message state to isPinned
    message.state.isPinned = true;
  }

  // return message
  return message;
};

/**
 * addIndices - Updates messages objects indicies
 *
 * @param {message} Object - Object containing message info
 * @returns {Object} message - Message object
 */
var addIndices = function addIndices(message, index) {
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
var setupMessages = exports.setupMessages = function setupMessages(req, res, next) {
  // if viewData already exists return to next middleware method
  if (req.session.viewData) return next();

  // Adds pinned items, adds indices
  var messages = _data.data.map(addPinnedItems).map(addIndices);

  // Setup viewData
  var viewData = {
    messages: messages,
    archive: [],
    isPinnedCount: [],
    isActionedCount: [],
    isNewsCount: []
  };

  // Set session viewData
  req.session.viewData = viewData;

  // Run next middleware
  next();
};