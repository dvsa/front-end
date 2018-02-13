/**
 * Checks if the element is hidden
 *
 * Supported: IE8+
 *
 * @param {HTMLElement} element Element to check
 */
export const isElementHidden = element => {
  let style = window.getComputedStyle(element);
  return style.display === 'none';
};
