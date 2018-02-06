import { validationResult } from 'express-validator/check';
import { addFormValuesToSession } from './session-helpers';
import { filterFormData } from './form-helpers';

export const renderViewWithValuesOrRedirect = (req, res, viewName, viewData = {}) => {
  // Check if first request is email
  const isEmailPath = req.path === '/prototypes/create-account/email' ? true : false;
  const isReviewPath = req.path === '/prototypes/create-account/review' ? true : false;

  // Check if email request path or session has create form data
  if (isEmailPath || (req.session && req.session.createAccountForm)) {
    // Review page requires all steps to be completed
    if (isReviewPath && !req.session.createAccountForm.hasAllRequiredKeys) {
      return res.redirect('/prototypes/create-account/email');
    }
    // Render view with session values
    return res.render(viewName, {
      values: req.session.createAccountForm,
      ...viewData,
    });
  }

  return res.redirect('/prototypes/create-account');
};

export const renderWithErrorsOrRedirectWithSession = (req, res, viewName, redirectUrl, viewData = {}) => {
  const errors = validationResult(req);
  const values = filterFormData(req.body);

  if (!errors.isEmpty()) {
    return res.render(viewName, {
      errors: errors.mapped(),
      values,
      ...viewData,
    });
  }

  req.session = addFormValuesToSession(req.session, values);

  if (req.session.createAccountForm && req.session.createAccountForm.hasAllRequiredKeys) {
    return res.redirect('/prototypes/create-account/review');
  }

  return res.redirect(redirectUrl);
};
