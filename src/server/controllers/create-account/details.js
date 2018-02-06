import { renderViewWithValuesOrRedirect, renderWithErrorsOrRedirectWithSession } from './helpers';

export const getDetails = (req, res) => {
  return renderViewWithValuesOrRedirect(req, res, 'prototypes/create-account/details');
};

export const postDetails = (req, res) => {
  return renderWithErrorsOrRedirectWithSession(req, res, 'prototypes/create-account/details', '/prototypes/create-account/contact-details');
};
