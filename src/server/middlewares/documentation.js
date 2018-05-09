import path from 'path';
import { startCase, kebabCase } from 'lodash';

import { CONFIG } from './../config/constants';
import { getDirectories, getAllFilePathsWithinPath } from './../helpers';

/**
 * Add documentation content and links to the request object
 * 
 * @param {*} req Express request object
 * @param {*} res Express response object
 * @param {*} next Express next function
 * 
 * @author Tameem Safi <t.safi@kainos.com>
 */
export const addDocumentationDataToRequestObject = (req, res, next) => {
  if(!req.path.includes('documentation')) {
    return next();
  }

  // Get all section markdown files
  const sectionsPaths = getDirectories(path.join(CONFIG.paths.views.base, 'documentation', 'sections'));

  sectionsPaths.forEach(sectionPath => {
    const folderName = path.basename(sectionPath);
    const sectionHeading = startCase(folderName);

    // Get section files
    const sectionFilePaths = getAllFilePathsWithinPath(sectionPath);

    let sectionContents = [];

    sectionFilePaths.forEach(itemFilePath => {
      const itemPathParsed = path.parse(itemFilePath);
      sectionContents.push({
        id: folderName + kebabCase(itemPathParsed.name),
        content: '',
      });
    });

  });

  // Convert markdown to html
  // Add links to sections to request
  // Add content to request

  res.json(sections);
  

  next();
}