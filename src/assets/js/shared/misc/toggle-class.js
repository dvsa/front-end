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
export function toggleClass(el, className, force) {
  // Check if new classList API is avaliagle
  if (el.classList) {
    el.classList.toggle(className, force);
    return;
  }

  // Get all of the class names as an array
  let classes = el.className.split(' ');
  let existingIndex = -1;

  // Find the index of the className in the array
  for (var i = classes.length; i--;) {
    if (classes[i] === className)
      existingIndex = i;
  }

  // Remove class
  if( existingIndex >= 0 && force !== true ) {
    classes.splice(existingIndex, 1);
  } else {
    if( force !== false ) {
      classes.push(className);
    }
  }

  // Re-add all of the classes
  el.className = classes.join(' ');
}