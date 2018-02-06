/**
 * closestParentOfEl
 *
 * Loops up the DOM tree until it finds a parent with the class name
 *
 * @param {DOMElement} el Element to start and traverse up from
 * @param {string} selector Selector to look for
 */
export function closestParentOfEl(el, className) {
  let matches = (document || el.ownerDocument).querySelectorAll(className);
  let i;
  do {
    i = matches.length;
    while (--i >= 0 && matches.item(i) !== el) {}
  } while (i < 0 && (el = el.parentElement));
  return el;
}
