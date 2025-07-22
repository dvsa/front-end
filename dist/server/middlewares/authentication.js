"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authenticationMiddleware = void 0;
var _basicAuth = _interopRequireDefault(require("basic-auth"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
/**
 * Handle when request is unauthorized
 *
 * @param {*} res Express response object
 *
 * @author Tameem Safi <t.safi@kainos.com>
 */
var unauthorized = function unauthorized(res) {
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
var authenticationMiddleware = exports.authenticationMiddleware = function authenticationMiddleware(req, res, next) {
  // Handles http basic auth prompt
  // and gets input from user
  // https://www.npmjs.com/package/basic-auth
  var user = (0, _basicAuth["default"])(req);

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