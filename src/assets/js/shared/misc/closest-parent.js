/**
 * closestParentOfEl
 *
 * Loops up the DOM tree until it finds a parent with the selector
 *
 * @param {DOMElement} el Element to start and traverse up from
 * @param {string} selector Selector to look for
 */
export function closestParentOfEl(el, selector) {
  let matches = (document || el.ownerDocument).querySelectorAll(selector);
  let i;
  do {
    i = matches.length;
    while (--i >= 0 && matches.item(i) !== el) {}
  } while (i < 0 && (el = el.parentElement));
  return el;
}
