/**
 * GET Middleware - Brancing method based on radio response
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
export const postRecallType = (req, res) => {
  // If radio response === other
  if (req.radioResponse === 'other') {
    // Redirect to component make
    return res.redirect('/prototypes/recalls/V1/component-make');
  }

  // else return to vehicle make
  return res.redirect('/prototypes/recalls/V1/vehicle-make');
};

/**
 * GET Middleware - Simple validation method for recalls validateType
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 * @param {Express.Response} next - Express next object
 */
export const validateType = (req, res, next) => {
  // Gets reference to radio response
  const radioResponse = req.body['radio-recalls-group'];

  // If radio response is null or undefined
  if (!radioResponse) {
    // redirect back to types of recall view
    return res.redirect('/prototypes/recalls/V1/type-of-recall');
  }

  // Else attatch response to the req object
  req.radioResponse = radioResponse;

  // Call next middleware function in middleware stack
  next();
};
