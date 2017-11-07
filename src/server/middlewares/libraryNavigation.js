import path from 'path';
import fs from 'fs';
import nodeDir from 'node-dir';
import { startCase } from 'lodash';

import { CONFIG } from './../config/constants';

export const isDirectory = source => fs.lstatSync(source).isDirectory();

export const getDirectories = source => {
  return fs
    .readdirSync(source)
    .map(name => path.join(source, name))
    .filter(isDirectory);
};

export const getAllFilePathsWithinPath = async path => {
  // Creates a promise since the function uses a callback
  return new Promise((resolve, reject) => {
    nodeDir.paths(path, (err, paths) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(paths.files);
    });
  });
};

export const addLibraryNavigationItemsToRequestObject = async (req, res, next) => {
  let currentRoute = req.path;
  let parentRoute = currentRoute.replace('/' + path.basename(req.path), '');

  let libraryFolderPaths = getDirectories(path.join(CONFIG.paths.views.base, 'library'));
  let navigationItems = [];

  for (let i = 0; i < libraryFolderPaths.length; i++) {
    let currentPath = libraryFolderPaths[i];
    let foldername = path.basename(currentPath);
    let fileRouteName = currentPath.replace(CONFIG.paths.views.base, '');
    let filePathsWithinCurrentFolder = await getAllFilePathsWithinPath(currentPath);
    let subItems = [];

    let parentActive = false;

    if (fileRouteName == req.path || fileRouteName + '/' == req.path || fileRouteName + '/index' == req.path) {
      parentActive = true;
    }

    for (let i = 0; i < filePathsWithinCurrentFolder.length; i++) {
      let filepath = filePathsWithinCurrentFolder[i];
      if (filepath.indexOf('index.njk') != -1) continue;
      let parsedPath = path.parse(filepath);
      let routeLink = fileRouteName + '/' + parsedPath.name;
      let parentPath = req.path.replace('/' + parsedPath.name, '');

      if (parentPath == fileRouteName) {
        parentActive = true;
      }

      subItems.push({
        name: startCase(parsedPath.name),
        link: routeLink,
        viewFile: filepath,
        active: routeLink == req.path,
        parentPath,
      });
    }

    navigationItems.push({
      name: startCase(foldername),
      link: fileRouteName,
      active: parentActive,
      viewFile: path.join(currentPath, 'index.njk'),
      subItems,
    });
  }

  req.libraryNavgiationItems = navigationItems;

  next();
};
