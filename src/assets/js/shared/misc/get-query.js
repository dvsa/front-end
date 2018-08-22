/**
 * getQueryVariable
 *
 * Returns value of passed key from window.location
 * Based on  https://css-tricks.com/snippets/javascript/get-url-variables/
 *
 * @param {string} Param name to return the value from
 *
 * @since 1.0.0
 * @author Martin D M <martind@kainos.com>
 */
export function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return false;
}
