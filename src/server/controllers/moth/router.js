/**
 * GET Middleware - Brancing method based on radio response
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
export const postMothType = (req, res) => {
  if (req.body.mothRadio === undefined) {
    return res.redirect('/prototypes/mot-history-data/cvs/what-vehicle');
  }

  // If radio response === other
  if (req.body.mothRadio === 'other') {
    // Redirect to component make
    return res.redirect('/prototypes/mot-history-data/cvs/enter-vrm-cvs');
  }

  // else return to vehicle make
  return res.redirect('/prototypes/mot-history-data/cvs/enter-vrm');
};
