import { renderViewWithValuesOrRedirect, renderWithErrorsOrRedirectWithSession } from './helpers';

export const getContactDetails = (req, res) => {
  return renderViewWithValuesOrRedirect(req, res, 'prototypes/create-account/contact-details');
};

export const postContactDetails = (req, res) => {
  return renderWithErrorsOrRedirectWithSession(
    req,
    res,
    'prototypes/create-account/contact-details',
    '/prototypes/create-account/security-questions'
  );
};
