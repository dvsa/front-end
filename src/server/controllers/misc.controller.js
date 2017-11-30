import fs from 'fs';
import path from 'path';
import { CONFIG } from './../config/constants';

// View file
export const viewFileRoute = (req, res) => {
  let directoryName = path.dirname(req.path);
  let directoryBaseName = path.basename(directoryName);

  // Partials folder show not be accessed
  if (directoryBaseName == 'partials') {
    return res.send('Partials folder is not an accessible route.');
  }

  let viewFilePath = path.join(CONFIG.paths.views.base, req.path + '.njk');
  let viewIndexFilePath = path.join(CONFIG.paths.views.base, req.path, 'index.njk');

  let viewData = {
    libraryNavigationItems: req.libraryNavgiationItems,
    loggedOut: true,
    designSystem: true,
  };

  // Check if view file exists
  if (fs.existsSync(viewFilePath)) {
    return res.render(viewFilePath, viewData);
  }

  // Check if folder has index file
  if (fs.existsSync(viewIndexFilePath)) {
    return res.render(viewIndexFilePath, viewData);
  }

  return res.send('404 - No route or view file found.');
};
