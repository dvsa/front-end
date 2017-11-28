'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.viewFileRoute = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _constants = require('./../config/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// View file
const viewFileRoute = exports.viewFileRoute = (req, res) => {
  let directoryName = _path2.default.dirname(req.path);
  let directoryBaseName = _path2.default.basename(directoryName);

  // Partials folder show not be accessed
  if (directoryBaseName == 'partials') {
    return res.send('Partials folder is not an accessible route.');
  }

  let viewFilePath = _path2.default.join(_constants.CONFIG.paths.views.base, req.path + '.njk');
  let viewIndexFilePath = _path2.default.join(_constants.CONFIG.paths.views.base, req.path, 'index.njk');

  let viewData = {
    libraryNavigationItems: req.libraryNavgiationItems,
    loggedOut: true,
    designSystem: true
  };

  // Check if view file exists
  if (_fs2.default.existsSync(viewFilePath)) {
    return res.render(viewFilePath, viewData);
  }

  // Check if folder has index file
  if (_fs2.default.existsSync(viewIndexFilePath)) {
    return res.render(viewIndexFilePath, viewData);
  }

  return res.send('404 - No route or view file found.');
};