/**
 * Checks if the element is hidden
 * - Inspiration from jQuery
 *
 * @param {HTMLElement} element Element to check
 *
 * @author Tameem Safi <t.safi@kainos.com>
 * @since 1.0.0
 */
export const isElementHidden = element => {
  return !isElementVisible(element);
};

/**
 * Checks if the element is visible
 * - Inspiration from jQuery
 *
 * @param {HTMLElement} element Element to check
 *
 * @author Tameem Safi <t.safi@kainos.com>
 * @since 1.0.0
 */
export const isElementVisible = element => {
  if (!element) return false;
  return !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length);
};
