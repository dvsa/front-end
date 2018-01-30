import { renderViewWithValuesOrRedirect, renderWithErrorsOrRedirectWithSession } from './helpers';

export const getPassword = (req, res) => {
  return renderViewWithValuesOrRedirect(req, res, 'prototypes/create-account/password');
};

export const postPassword = (req, res) => {
  return renderWithErrorsOrRedirectWithSession(req, res, 'prototypes/create-account/password', '/prototypes/create-account/review');
};
