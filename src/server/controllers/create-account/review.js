import { renderViewWithValuesOrRedirect } from './helpers';

export const getReview = (req, res) => {
  return renderViewWithValuesOrRedirect(req, res, 'prototypes/create-account/review');
};
