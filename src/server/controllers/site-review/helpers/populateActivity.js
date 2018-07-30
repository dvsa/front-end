/**
 * Populates activity data middlestack
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 * @param {Express.Next} - Express Next object
 */
export const populateActivity = (req, res, next) => {
  // Resets activity viewData
  req.session.viewData.activity.isCompleted = false;
  req.session.viewData.activity.commitedTestNum = '';
  req.session.viewData.activity.commitedReason = null;

  // If errors exist
  if (req.session.viewData.activity.errors.length) {
    // Run next middleware method
    next();
  }

  // If yes was selected
  if (req.body['radio-activity'] == 'yes') {
    // Set commited data
    req.session.viewData.activity.commitedActivityPerformed = true;
    req.session.viewData.activity.commitedTestNum = req.body['test-number'];
  }

  // If no was selected
  else {
    // Set commited data
    req.session.viewData.activity.commitedActivityPerformed = false;
    req.session.viewData.activity.commitedReason = req.body['reinspection-options'];

    let reasons = [
      "It wasn't necessary",
      'Blocked by pseudo customer',
      'Blocked by vehicle owner',
      'I felt under threat from the garage staff',
      'Other',
    ];

    req.session.viewData.activity.commitedReason = reasons[req.session.viewData.activity.formData.reason - 1];
  }

  // Set view to be completed
  req.session.viewData.activity.isCompleted = true;

  // Run next middleware method
  next();
};
