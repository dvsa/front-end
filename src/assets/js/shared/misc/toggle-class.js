/**
 * toggleClass
 *
 * Toggles the class for a DOM element.
 *
 * @param {DOMElement} el Element to toggle the class for.
 * @param {string} className Name of the class to toggle.
 */
export function toggleClass(el, className, force) {
  if (!el || !className) return;

  let forceTrue = typeof force === 'boolean' && force === true;
  let forceFalse = typeof force === 'boolean' && force === false;

  if (el.classList.contains(className)) {
    if (!forceTrue) {
      el.classList.remove(className);
    }
  } else {
    if (!forceFalse) {
      el.classList.add(className);
    }
  }
}
