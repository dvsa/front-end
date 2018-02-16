/**
 * Checks if the element is hidden
 *
 * Supported: IE8+
 *
 * @param {HTMLElement} element Element to check
 *
 * @since 1.0.0
 * @author Tameem Safi <t.safi@kainos.com>
 */
export const isElementHidden = element => {
  let style = window.getComputedStyle(element);
  return style.display === 'none';
};
