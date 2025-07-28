"use strict";

require("core-js/modules/esnext.weak-map.delete-all.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postSuspendTesters = exports.getSuspendTesters = void 0;
var uploadHelpers = _interopRequireWildcard(require("./helpers/upload-helpers"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const getSuspendTesters = (req, res) => {
  return res.render('prototypes/annual-assessment-admin-tool/suspend-testers/index', {
    errors: req.session.errors
  });
};
exports.getSuspendTesters = getSuspendTesters;
const postSuspendTesters = (req, res) => {
  req.session.errors = [];
  // File was not uploaded
  if (!req.body['file-upload']) req.session.errors.push('Choose a CSV file - You must choose a CSV file to upload');
  // Assigns boolean value from file extension check
  const isCSV = uploadHelpers.isFileExtensionOfType(uploadHelpers.getFileExtension(req.body['file-upload']), 'CSV');
  // File is not CSV
  if (req.body['file-upload'] && !isCSV) req.session.errors.push('Choose a CSV File - File type must be a CSV file');
  // If no errors exist in session
  if (!req.session.errors.length) {
    // Clear session
    req.session.errors = null;
    return res.redirect('/prototypes/annual-assessment-admin-tool/suspend-testers/review');
  }
  return res.redirect('/prototypes/annual-assessment-admin-tool/suspend-testers/');
};
exports.postSuspendTesters = postSuspendTesters;