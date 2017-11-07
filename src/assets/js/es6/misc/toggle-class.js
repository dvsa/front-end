/**
 * toggleClass
 * 
 * Toggles the class for a DOM element.
 * 
 * Supported: IE8+
 * 
 * @param {DOMElement} el Element to toggle the class for.
 * @param {string} className Name of the class to toggle.
 */
export function toggleClass(el, className) {
  if (el.classList) {
    el.classList.toggle(className);
  }
  var classes = el.className.split(' ');
  var existingIndex = -1;
  for (var i = classes.length; i--;) {
    if (classes[i] === className)
      existingIndex = i;
  }

  if (existingIndex >= 0) {
    classes.splice(existingIndex, 1);
  } else {
    classes.push(className);
  }
  el.className = classes.join(' ');
}