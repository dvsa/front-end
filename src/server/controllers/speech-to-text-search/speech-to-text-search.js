import { addToSession } from './helpers/add-to-session';

// Helper function to render view with view data
const renderview = (req, res, url) => {
  res.render(url, { viewData: req.session.viewData || {} });
};

export const getSearchQuery = (req, res) => {
  return renderview(req, res, 'prototypes/speech-to-text/index');
};

export const postSearchQuery = (req, res) => {
  // If Search query does not exist redirect to current page
  if (!req.body.q) return res.redirect('/prototypes/speech-to-text/categories');

  // Adds object to viewData session object
  addToSession(req, 'viewData')({ search: req.body.q });

  // Renders new view with session viewData applied
  return renderview(req, res, 'prototypes/speech-to-text/categories/brake-lights');
};

export const captureFormValues = (req, res) => {
  // Gets a refer to req.session.viewData
  let addToViewDataSession = addToSession(req, 'viewData');

  // Adds a new flash message
  req.flash('flash', 'Stop lamp(s) missing');
  res.locals.message = req.flash();

  // Adds form data and flash message to viewData session
  addToViewDataSession({ formData: req.body });

  // Renders new view with session viewData applied
  return renderview(req, res, 'prototypes/speech-to-text/categories/brake-lights');
};

export const removeDefect = (req, res) => {
  // Resets viewData session
  req.session.viewData = {};

  // Renders categories view
  return res.render('prototypes/speech-to-text/index');
};
