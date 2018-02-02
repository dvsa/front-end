import { elHasClass } from './has-class';

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

/**
 * Delegates an event handler to a DOM element
 *
 * @param Element domElement Element to use for delegation
 * @param String eventName Name of the event to listen for
 * @param String selector Selector of the element to look out for
 * @param Function hanlder Hanlder for the selector
 *
 * @since 1.0.14
 * @author Tameem Safi <t.safi@kainos.com>
 */
export const delegateEvent = (domElement, eventName, selector, handler) => {
  if (!domElement) {
    return console.warn('DOM element must be provided for delegation');
  }

  if (!eventName) {
    return console.warn('Event name required for event delegation');
  }

  if (!selector) {
    return console.warn('Valid selector required for event delegation');
  }

  if (!handler || typeof handler !== 'function') {
    return console.warn('Hander must be a valid function for event delegation');
  }

  // Add event listener to the document object for delegation
  domElement.addEventListener(eventName, event => {
    // Check that target exists
    if (!event.target) return;
    // Check if target element has the class of the selector
    if (event.target.matches(selector)) {
      handler(event);
    }
  });
};

/**
 * Trigger a custom javascript event
 * 
 * Works on IE9+
 *
 * @param {HTMLElement} element Element on which the event should trigger
 * @param {String} eventName Name of the custom event
 * @param {Object} data Any custom data that should be passed with the custom event
 * 
 * @since 1.0.14
 * @author Tameem Safi <t.safi@kainos.com>
 */
export const triggerCustomEvent = (element, eventName, data = {}) => {
  let event;

  if (window.CustomEvent) {
    event = new CustomEvent(eventName, {detail: data});
  } else {
    event = document.createEvent('CustomEvent');
    event.initCustomEvent(eventName, true, true, data);
  }

  element.dispatchEvent(event);
};