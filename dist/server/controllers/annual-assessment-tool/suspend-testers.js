'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postSuspendTesters = exports.getSuspendTesters = undefined;

var _uploadHelpers = require('./helpers/upload-helpers');

var uploadHelpers = _interopRequireWildcard(_uploadHelpers);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

const getSuspendTesters = exports.getSuspendTesters = (req, res) => {
  return res.render('prototypes/annual-assessment-admin-tool/suspend-testers/index', { errors: req.session.errors });
};

const postSuspendTesters = exports.postSuspendTesters = (req, res) => {
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