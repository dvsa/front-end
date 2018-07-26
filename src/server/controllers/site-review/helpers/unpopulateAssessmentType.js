import { getLastInUrl } from './getLastInUrl';

/**
 * Resets an assessment sections value in the site review journey
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 * @param {Express.Next} - Express Next object
 */
export const unpopulateAssessmentType = (req, res, next) => {
  // Gets text string after last '/' in URL
  let assessmentType = getLastInUrl(req);
  
  // Resets assessment types session data
  req.session.viewData[assessmentType].commitedLevel = '';
  req.session.viewData[assessmentType].commitedComment = '';
  req.session.viewData[assessmentType].errors = [];
  req.session.viewData[assessmentType].satisfactory.isChecked = false;
  req.session.viewData[assessmentType].satisfactory.comment = '';
  req.session.viewData[assessmentType].improve.isChecked = false;
  req.session.viewData[assessmentType].improve.comment = '';
  req.session.viewData[assessmentType].unsatisfactory.isChecked = false;
  req.session.viewData[assessmentType].unsatisfactory.comment = '';

  // Calls next middleware in middleware stack
  next();
};
