import { elHasClass } from './has-class';

/**
 * Delegates an event
 * handler to a DOM element
 *
 * @param Element domElement Element to use for delegation
 * @param String eventName Name of the event to listen for
 * @param String selector Selector of the element to look out for
 * @param Function hanlder Hanlder for the selector
 *
 * @since 1.1.0
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
