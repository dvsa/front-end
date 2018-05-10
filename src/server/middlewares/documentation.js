import path from 'path';
import fs from 'fs';
import { startCase, kebabCase } from 'lodash';
import marked from 'marked';
import { promisify } from 'util';
import yaml from 'js-yaml';

import { CONFIG } from './../config/constants';
import { getDirectories, getAllFilePathsWithinPath } from './../helpers';
import { fstat } from 'fs';

const asyncReadFile = promisify(fs.readFile);

/**
 * Add documentation content and links to the request object
 *
 * @param {*} req Express request object
 * @param {*} res Express response object
 * @param {*} next Express next function
 *
 * @author Tameem Safi <t.safi@kainos.com>
 */
export const addDocumentationDataToRequestObject = async (req, res, next) => {
  if (!req.path.includes('documentation')) {
    return next();
  }

  // Get all section markdown files
  const sectionsPaths = getDirectories(path.join(CONFIG.paths.views.base, 'documentation', 'sections'));

  const sections = await Promise.all(sectionsPaths.map(async (sectionPath) => {
    const sectionName = path.basename(sectionPath);
    const sectionHeading = startCase(sectionName);

    // Get section files
    const sectionFilePaths = await getAllFilePathsWithinPath(sectionPath);
   
    if(!sectionFilePaths || !sectionFilePaths.length) return;
 
    const sectionContents = await Promise.all(sectionFilePaths.map(async (itemFilePath) => {
      const itemPathParsed = path.parse(itemFilePath);
      const name = itemPathParsed.name.replace(/\d.\s/g, '').replace();
      let fileContents = await asyncReadFile(itemFilePath, { encoding: 'utf8' });

      // Get meta data
      if (fileContents.slice(0, 3) !== '---') return false;
      fileContents = fileContents.replace('---', '');
      const matcher = new RegExp(/\n(\.{3}|-{3})/g);
      const endMatch = matcher.exec(fileContents);

      const metaContent = fileContents.slice(0, endMatch.index);
      const markdownContent = fileContents.slice(matcher.lastIndex);
      const metaData = yaml.safeLoad(metaContent);
      const htmlContent = marked(markdownContent);
      const id = sectionName + '-' + kebabCase(metaData.menuName);
      return {
        id,
        heading: metaData.menuName,
        htmlContent: `
          <div class="dvsa-frontend-documentation__section" id="${id}">
            ${htmlContent}
          </div>
        `,
      };
    }));

    return {
      name: sectionName,
      heading: sectionHeading,
      sectionContents,
    };
  }));

  res.locals.documentationSections = sections;

  next();
};
