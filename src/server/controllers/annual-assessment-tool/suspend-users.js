import * as uploadHelpers from './helpers/upload-helpers';

export const getSuspendUsers = (req, res) => {
  const { viewData } = req.session.errors;
  return res.redirect('/prototypes/annual-assessment-admin-tool/suspend-users/index', viewData);    
};

export const postSuspendUsers = (req, res) => {
  if (!req.body['file-upload']) {
    errors.push(["Please ensure you've uploaded a file"]);
    req.session.errors.push(["Please ensure you've uploaded a file"]);
  } 

  const isCSV = uploadHelpers.isFileExtensionOfType(uploadHelpers.getFileExtension(req.body['file-upload']), 'CSV');
  
  if (req.body['file-upload'] && !isCSV) req.session.errors.push(['File type must be of CSV']);
  
  if (!req.session.errors) {
    return res.redirect('/prototypes/annual-assessment-admin-tool/suspend-users/review');   
  }

  return res.redirect('/prototypes/annual-assessment-admin-tool/suspend-users/index');
};

