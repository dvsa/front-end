import { renderViewWithValuesOrRedirect, renderWithErrorsOrRedirectWithSession, addFormValuesToSession } from './helpers';

export const getPassword = (req, res) => {
  // Only testing password route
  if (req.query.testPasswordJouneyOnly) {
    // Reset session with pre-filled data
    req.session.createAccountForm = {};
    req.session = addFormValuesToSession(req.session, {
      errors: false,
      email: 'test@google.com',
      firstname: 'Test',
      lastname: 'Test',
      day: 1,
      month: 1,
      year: 1980,
      address1: '1 test road',
      townOrCity: 'London',
      postCode: 'SW1A 1AA',
      phoneNumber: '12345678910',
      questionOne: 1,
      questionOneAnswer: 'answer1',
      questionTwo: 2,
      questionTwoAnswer: 'answer2',
    });
    // Redirect back to password route
    return res.redirect('/prototypes/create-account/password');
  }
  return renderViewWithValuesOrRedirect(req, res, 'prototypes/create-account/password');
};

export const postPassword = (req, res) => {
  return renderWithErrorsOrRedirectWithSession(req, res, 'prototypes/create-account/password', '/prototypes/create-account/review');
};
