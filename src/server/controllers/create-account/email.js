import { renderViewWithValuesOrRedirect, renderWithErrorsOrRedirectWithSession } from './helpers';

export const getEmail = (req, res) => {
  return renderViewWithValuesOrRedirect(req, res, 'prototypes/create-account/email');
};

export const postEmail = (req, res) => {
  return renderWithErrorsOrRedirectWithSession(req, res, 'prototypes/create-account/email', '/prototypes/create-account/details');
};
