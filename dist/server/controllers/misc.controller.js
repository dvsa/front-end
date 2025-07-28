"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.viewFileRoute = void 0;
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _constants = require("./../config/constants");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// View file
const viewFileRoute = (req, res) => {
  let directoryName = _path.default.dirname(req.path);
  let directoryBaseName = _path.default.basename(directoryName);

  // Partials folder show not be accessed
  if (directoryBaseName == 'partials') {
    return res.send('Partials folder is not an accessible route.');
  }
  let viewFilePath = _path.default.join(_constants.CONFIG.paths.views.base, req.path + '.njk');
  let viewIndexFilePath = _path.default.join(_constants.CONFIG.paths.views.base, req.path, 'index.njk');
  let viewData = {
    libraryNavigationItems: req.libraryNavgiationItems,
    loggedOut: true,
    designSystem: true
  };

  // Check if view file exists
  if (_fs.default.existsSync(viewFilePath)) {
    return res.render(viewFilePath, viewData);
  }

  // Check if folder has index file
  if (_fs.default.existsSync(viewIndexFilePath)) {
    return res.render(viewIndexFilePath, viewData);
  }
  return res.send('404 - No route or view file found.');
};
exports.viewFileRoute = viewFileRoute;