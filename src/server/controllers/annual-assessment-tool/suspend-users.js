import * as uploadHelpers from './helpers/upload-helpers';

export const getSuspendUsers = (req, res) => {
  return res.render('prototypes/annual-assessment-admin-tool/suspend-users/index', { errors: req.session.errors });
};

export const postSuspendUsers = (req, res) => {
  req.session.errors = [];
  // If file was not uploaded then add an error message to session
  if (!req.body['file-upload']) req.session.errors.push('Please upload a file');
  // Assigns boolean value from file extension check
  const isCSV = uploadHelpers.isFileExtensionOfType(uploadHelpers.getFileExtension(req.body['file-upload']), 'CSV');
  // If file extension is not CSV then add an error message to session
  if (req.body['file-upload'] && !isCSV) req.session.errors.push('File type must be of CSV');
  // If no errors exist in session
  if (!req.session.errors.length) {
    // Clear session
    req.session.errors = null;
    return res.redirect('/prototypes/annual-assessment-admin-tool/suspend-users/review');
  }
  return res.redirect('/prototypes/annual-assessment-admin-tool/suspend-users/');
};
