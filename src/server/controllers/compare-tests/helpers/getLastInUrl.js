/**
 * Returns string of value after the last '/' in a URL
 *
 * @param {Express.Request} req - Express request object
 * @returns {String} - String value of proceeding text from last '/'
 */
export const getLastInUrl = req => {
  return req.url.substring(req.url.lastIndexOf('/') + 1);
};
