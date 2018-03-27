/**
 * Check to see if the element is in the viewport
 *
 * Tested with:
 * IE7+, iOS5+ Safari, Android2+, Blackberry, Opera Mobile, and IE Mobile 10.
 * 
 * See:
 * https://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport/7557433#7557433
 *
 * @param {HTMLElement} el Element to check
 *
 * @author Tameem Safi <t.safi@kainos.com>
 * @since 1.1.25
 */
export function isElementInViewport (el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}