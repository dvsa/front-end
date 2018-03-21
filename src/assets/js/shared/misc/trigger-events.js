/**
 * Trigger event on element
 *
 * For a full list of event types:
 * https://developer.mozilla.org/en-US/docs/Web/API/document.createEvent
 *
 * @param {DOMElement} el Element to trigger event on
 * @param {String} eventName Native element to trigger
 *
 * @author Tameem Safi <t.safi@kainos.com>
 * @since 1.0.0
 */
export function triggerEventOnElement(el, eventName) {
  if (!el) return;
  const event = document.createEvent('HTMLEvents');
  event.initEvent('change', true, false);
  el.dispatchEvent(event);
}

/**
 * Simulate a click event.
 *
 * @param {DOMElement} el Element to trigger event on
 *
 * @author Tameem Safi <t.safi@kainos.com>
 * @since 1.0.0
 */
export function triggerClickEventOnElement(el) {
  // Create our event (with options)
  const evt = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    view: window,
  });
  // If cancelled, don't dispatch our event
  const canceled = !el.dispatchEvent(evt);
}
