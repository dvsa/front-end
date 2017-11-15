/**
 * addEventListenerToEl
 *
 * Adds an event listener to an element.
 *
 * Supported: IE8+
 *
 * @param {DOMElement} el Element to add the event to.
 * @param {string} eventName Name of the event.
 * @param {function} handler Callback function to handle event.
 */
export function addEventListenerToEl(el, eventName, handler) {
  if (el.addEventListener) {
    el.addEventListener(eventName, handler);
    return;
  }
  el.attachEvent('on' + eventName, function() {
    handler.call(el);
  });
}

/**
 * removeEventListenerFromEl
 *
 * Removes an event handler from an element.
 *
 * Supported: IE8+
 *
 * @param {DOMElement} el DOM element
 * @param {string} eventName Name of the event.
 * @param {function} handler Callback function to remove from event.
 */
export function removeEventListenerFromEl(el, eventName, handler) {
  if (el.removeEventListener) {
    el.removeEventListener(eventName, handler);
    return;
  }
  el.detachEvent('on' + eventName, handler);
}

/**
 * removeAllEventsFromEl
 *
 * Removes all event handlers from an element.
 *
 * Supported: IE8+
 *
 * @param {DOMElement} el DOM element
 */
export function removeAllEventsFromEl(el) {
  var clone = el.cloneNode(true);
  el.parentNode.replaceChild(clone, el);
}
