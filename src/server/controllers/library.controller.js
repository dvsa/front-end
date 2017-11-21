import path from 'path';
import fs from 'fs';
import nodeDir from 'node-dir';
import { upperFirst } from 'lodash';

import { CONFIG } from './../config/constants';

// Library Routes
export let libraryNavgiationItems = async (req, res, next) => {
  let viewData = {
    pageTitle: 'MOT Library',
    loggedOut: true,
    designSystem: true,
  };

  let libraryFolderPaths = getDirectories(path.join(CONFIG.paths.views.base, 'library'));
  let navigationItems = [];

  for (let i = 0; i < libraryFolderPaths.length; i++) {
    let currentPath = libraryFolderPaths[i];
    let foldername = path.basename(currentPath);
    let fileRouteName = currentPath.replace(CONFIG.paths.views.base, '');
    let filePathsWithinCurrentFolder = await getAllFilePathsWithinPath(currentPath);
    let subItems = [];

    for (let i = 0; i < filePathsWithinCurrentFolder.length; i++) {
      let filepath = filePathsWithinCurrentFolder[i];
      if (filepath.indexOf('index.njk') != -1) continue;
      let parsedPath = path.parse(filepath);
      // let fileRouteName = filepath.replace(currentPath, '');
      let routeLink = fileRouteName + '/' + parsedPath.name;
      subItems.push({
        name: upperFirst(parsedPath.name),
        link: routeLink,
        active: false,
      });
    }

    navigationItems.push({
      name: upperFirst(foldername),
      link: fileRouteName,
      active: false,
      subItems,
    });
  }

  req.libraryNavgiationItems = navigationItems;
  next();
};
