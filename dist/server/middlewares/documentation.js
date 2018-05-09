'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addDocumentationDataToRequestObject = undefined;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _constants = require('./../config/constants');

var _helpers = require('./../helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Add documentation content and links to the request object
 *
 * @param {*} req Express request object
 * @param {*} res Express response object
 * @param {*} next Express next function
 *
 * @author Tameem Safi <t.safi@kainos.com>
 */
const addDocumentationDataToRequestObject = exports.addDocumentationDataToRequestObject = (req, res, next) => {
  if (!req.path.includes('documentation')) {
    return next();
  }

  // Get all section markdown files
  const sectionsPaths = (0, _helpers.getDirectories)(_path2.default.join(_constants.CONFIG.paths.views.base, 'documentation', 'sections'));

  sectionsPaths.forEach(sectionPath => {
    const folderName = _path2.default.basename(sectionPath);
    const sectionHeading = (0, _lodash.startCase)(folderName);

    // Get section files
    const sectionFilePaths = (0, _helpers.getAllFilePathsWithinPath)(sectionPath);

    let sectionContents = [];

    sectionFilePaths.forEach(itemFilePath => {
      const itemPathParsed = _path2.default.parse(itemFilePath);
      sectionContents.push({
        id: folderName + (0, _lodash.kebabCase)(itemPathParsed.name),
        content: ''
      });
    });
  });

  // Convert markdown to html
  // Add links to sections to request
  // Add content to request

  res.json(sections);

  next();
};