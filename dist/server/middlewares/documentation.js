'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addDocumentationDataToRequestObject = undefined;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _lodash = require('lodash');

var _marked = require('marked');

var _marked2 = _interopRequireDefault(_marked);

var _util = require('util');

var _jsYaml = require('js-yaml');

var _jsYaml2 = _interopRequireDefault(_jsYaml);

var _constants = require('./../config/constants');

var _helpers = require('./../helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const asyncReadFile = (0, _util.promisify)(_fs2.default.readFile);

/**
 * Add documentation content and links to the request object
 *
 * @param {*} req Express request object
 * @param {*} res Express response object
 * @param {*} next Express next function
 *
 * @author Tameem Safi <t.safi@kainos.com>
 */
const addDocumentationDataToRequestObject = exports.addDocumentationDataToRequestObject = async (req, res, next) => {
  if (!req.path.includes('documentation')) {
    return next();
  }

  // Get all section markdown files
  const sectionsPaths = (0, _helpers.getDirectories)(_path2.default.join(_constants.CONFIG.paths.views.base, 'documentation', 'sections'));

  const sections = await Promise.all(sectionsPaths.map(async sectionPath => {
    const sectionName = _path2.default.basename(sectionPath);
    const sectionHeading = (0, _lodash.startCase)(sectionName);

    // Get section files
    const sectionFilePaths = await (0, _helpers.getAllFilePathsWithinPath)(sectionPath);

    if (!sectionFilePaths || !sectionFilePaths.length) return;

    const sectionContents = await Promise.all(sectionFilePaths.map(async itemFilePath => {
      const itemPathParsed = _path2.default.parse(itemFilePath);
      const name = itemPathParsed.name.replace(/\d.\s/g, '').replace();
      let fileContents = await asyncReadFile(itemFilePath, { encoding: 'utf8' });

      // Get meta data
      if (fileContents.slice(0, 3) !== '---') return false;
      fileContents = fileContents.replace('---', '');
      const matcher = new RegExp(/\n(\.{3}|-{3})/g);
      const endMatch = matcher.exec(fileContents);

      const metaContent = fileContents.slice(0, endMatch.index);
      const markdownContent = fileContents.slice(matcher.lastIndex);
      const metaData = _jsYaml2.default.safeLoad(metaContent);
      const htmlContent = (0, _marked2.default)(markdownContent);
      const id = sectionName + '-' + (0, _lodash.kebabCase)(metaData.menuName);
      return {
        id,
        heading: metaData.menuName,
        htmlContent: `
          <div class="dvsa-frontend-documentation__section" id="${id}">
            ${htmlContent}
          </div>
        `
      };
    }));

    return {
      name: sectionName,
      heading: sectionHeading,
      sectionContents
    };
  }));

  res.locals.documentationSections = sections;

  next();
};