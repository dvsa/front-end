import { renderViewWithValuesOrRedirect, renderWithErrorsOrRedirectWithSession, allSecurityQuestions } from './helpers';

export const getSecurityQuestions = (req, res) => {
  return renderViewWithValuesOrRedirect(req, res, 'prototypes/create-account/security-questions', {
    securityQuestions: allSecurityQuestions(),
  });
};

export const postSecurityQuestions = (req, res) => {
  return renderWithErrorsOrRedirectWithSession(
    req,
    res,
    'prototypes/create-account/security-questions',
    '/prototypes/create-account/password',
    {
      securityQuestions: allSecurityQuestions(),
    }
  );
};
