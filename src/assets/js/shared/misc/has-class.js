/**
 * elHasClass
 *
 * Checks if the element has the class.
 *
 * Supported: IE8+
 *
 * @param {DOMElement} el Element to check the class of.
 * @param {string} class Name of the class to check for.
 *
 * @since 1.0.0
 * @author Tameem Safi <t.safi@kainos.com>
 */
export function elHasClass(el, className) {
  // Replace the '.' character incase it was used
  className = className.replace('.', '');
  // Check if brower supports classlist
  if (el.classList) {
    return el.classList.contains(className);
  }
  // If not use a regex implementation
  return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
}
