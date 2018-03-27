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
 * @param {Number} xOffet Offset to add to the element rect bottom
 * @param {Number} uOffet Offset to add to the element rect right
 *
 * @author Tameem Safi <t.safi@kainos.com>
 * @since 1.1.25
 */
export function isElementInViewport(el, xOffet = 0, yOffset = 0) {
  const rect = el.getBoundingClientRect();
  console.log(rect);
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom - xOffet <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right - yOffset <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
