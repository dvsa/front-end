'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authenticationMiddleware = undefined;

var _basicAuth = require('basic-auth');

var _basicAuth2 = _interopRequireDefault(_basicAuth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Handle when request is unauthorized
 *
 * @param {*} res Express response object
 *
 * @author Tameem Safi <t.safi@kainos.com>
 */
const unauthorized = res => {
  res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
  return res.send(401);
};

/**
 * Handles authentication
 *
 * @param {*} req Express request object
 * @param {*} res Express response object
 * @param {*} next Express next function
 *
 * @author Tameem Safi <t.safi@kainos.com>
 */
const authenticationMiddleware = exports.authenticationMiddleware = (req, res, next) => {
  // Handles http basic auth prompt
  // and gets input from user
  // https://www.npmjs.com/package/basic-auth
  const user = (0, _basicAuth2.default)(req);

  // Check if username and password was set
  if (!user || !user.name || !user.pass) {
    // No user was set
    // request is unauthorized
    return unauthorized(res);
  }

  /**
   * Check if username/password entered matches the enviroment variables,
   * for security should be stored in enviroment variable
   *
   * Heroku CLI:
   * -----------
   * heroku config:set AUTH_USERNAME=username_here
   * heroku config:set AUTH_PASSWORD=password_here
   */
  if (user.name === process.env.AUTH_USERNAME && user.pass === process.env.AUTH_PASSWORD) {
    // User was authenticated
    // pass request to next middleware
    return next();
  }

  // Request is unauthorized
  return unauthorized(res);
};